import { Injectable, Logger, Inject } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';
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

  async generatePostContent(topic: string): Promise<AiGeneratedContent> {
    if (!this.ai) {
      throw new Error('Gemini API is not configured.');
    }

    const model = this.ai.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const prompt = `
      Eres un Agente Experto en Creación de Contenido para Instagram y LinkedIn en el sector de clínicas de estética y tecnología médica.
      Crea un post persuasivo sobre el siguiente tema: "${topic}".
      
      Debes crear también un "imagePrompt" (un prompt en inglés MUY detallado para DALL-E 3).
      REGLAS PARA EL PROMPT DE IMAGEN:
      1. Elige el mejor estilo para el tema: puede ser FOTOGRAFÍA HIPER-REALISTA (ej. 85mm lens, soft studio lighting, cinematic) o un RENDER 3D DE ALTA CALIDAD (ej. Octane render, Unreal Engine 5 style, abstract medical tech, clean aesthetic).
      2. Evita ilustraciones baratas, estilo cartoon, o texto incrustado en la imagen. Tiene que verse premium, corporativo y profesional.

      Devuelve ÚNICAMENTE un JSON válido con esta estructura, sin markdown adicional ni acentos graves:
      {
        "content": "El texto persuasivo del post con emojis y hashtags",
        "imagePrompt": "El prompt en inglés hiper-detallado para la IA generadora de imágenes"
      }
    `;

    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      // Clean potential markdown formatting
      const cleanJson = text
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

      const parsed = JSON.parse(cleanJson) as Record<string, unknown>;

      const content = typeof parsed.content === 'string' ? parsed.content : '';
      const imagePrompt =
        typeof parsed.imagePrompt === 'string' ? parsed.imagePrompt : '';

      return {
        content,
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
