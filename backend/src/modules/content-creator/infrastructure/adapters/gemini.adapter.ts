import { Injectable, Logger, Inject } from '@nestjs/common';
import { GoogleGenerativeAI, Part } from '@google/generative-ai';
import axios from 'axios';
import {
  AiGeneratorPort,
  AiGeneratedContent,
} from '../../domain/ports/ai-generator.port';

@Injectable()
export class GeminiAdapter implements AiGeneratorPort {
  private readonly logger = new Logger(GeminiAdapter.name);
  private ai: GoogleGenerativeAI | null = null;

  constructor(@Inject('GEMINI_API_KEY') private readonly apiKey: string) {
    if (this.apiKey) {
      this.ai = new GoogleGenerativeAI(this.apiKey);
    } else {
      this.logger.warn(
        'GEMINI_API_KEY is missing. Content generation will fail.',
      );
    }
  }

  async generatePostContent(
    topic: string,
    referenceImageUrl?: string,
  ): Promise<AiGeneratedContent> {
    if (!this.ai) {
      throw new Error('Gemini API is not configured.');
    }

    const modelName = 'gemini-2.5-flash';
    const promptParts: (string | Part)[] = [];

    let basePrompt = `
      Eres un Agente Experto en Creación de Prompts Visuales para herramientas de generación de imágenes como Midjourney o DALL-E 3.
      Tu único objetivo es tomar la siguiente idea base: "${topic}" y convertirla en un SUPER PROMPT hiper-detallado en INGLÉS para generar una imagen espectacular.
      
      REGLAS PARA EL PROMPT DE IMAGEN:
      1. Elige el mejor estilo para el tema: puede ser FOTOGRAFÍA HIPER-REALISTA (ej. 85mm lens, soft studio lighting, cinematic), FOTOGRAFÍA LIFESTYLE CASUAL, o un RENDER 3D DE ALTA CALIDAD.
      2. Evita ilustraciones baratas o estilo cartoon. Tiene que verse premium y profesional. Si el usuario pide explícitamente que haya un texto escrito, ASEGÚRATE de incluir en el prompt en inglés la instrucción exacta de pintar ese texto (ej: "text 'X' prominently displayed").
      3. Añade detalles técnicos de iluminación, cámara, texturas y ambiente.
      `;

    if (referenceImageUrl) {
      this.logger.log(`Downloading reference image from ${referenceImageUrl}`);
      try {
        const imageResponse = await axios.get<ArrayBuffer>(referenceImageUrl, {
          responseType: 'arraybuffer',
        });
        const base64Data = Buffer.from(imageResponse.data).toString('base64');
        const headerContentType = (
          imageResponse.headers as Record<string, string>
        )['content-type'];
        const mimeType = headerContentType || 'image/jpeg';

        promptParts.push({
          inlineData: {
            data: base64Data,
            mimeType,
          },
        });

        basePrompt += `
      4. CRÍTICO: Se adjunta una IMAGEN DE REFERENCIA. Analiza la imagen con extremo detalle compositivo, de iluminación y estilístico. El "imagePrompt" que generes DEBE replicar exactamente ese mismo estilo visual, aplicado a la idea base especificada.`;
      } catch (error) {
        this.logger.error('Failed to download reference image', error);
      }
    }

    basePrompt += `
      Devuelve ÚNICAMENTE un JSON válido con esta estructura, sin markdown adicional ni acentos graves:
      {
        "imagePrompt": "El prompt en inglés hiper-detallado para la IA generadora de imágenes"
      }
    `;

    promptParts.push(basePrompt);

    const model = this.ai.getGenerativeModel({ model: modelName });

    try {
      const result = await model.generateContent(promptParts);
      const text = result.response.text();

      const cleanJson = String(text)
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleanJson) as {
        imagePrompt?: string;
      };

      const imagePrompt =
        typeof parsed.imagePrompt === 'string' ? parsed.imagePrompt : '';

      return {
        content: '', // Ya no generamos el texto del post automáticamente
        imagePrompt,
      };
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error generating content with Gemini: ${error.message}`,
        );
      } else {
        this.logger.error('Error generating content with Gemini', error);
      }
      throw new Error('Fallo al generar contenido con IA.');
    }
  }
}
