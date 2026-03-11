import { Injectable, Logger, Inject } from '@nestjs/common';
import OpenAI from 'openai';
import { ImageGeneratorPort } from '../../domain/ports/image-generator.port';

@Injectable()
export class OpenAiAdapter implements ImageGeneratorPort {
  private readonly logger = new Logger(OpenAiAdapter.name);
  private openai: OpenAI | null = null;

  constructor(@Inject('OPENAI_API_KEY') private readonly apiKey: string) {
    if (this.apiKey) {
      this.openai = new OpenAI({ apiKey: this.apiKey });
    } else {
      this.logger.warn(
        'OPENAI_API_KEY is missing. Image generation will fail.',
      );
    }
  }

  async generateImage(prompt: string): Promise<string> {
    if (!this.openai) {
      throw new Error('OpenAI API is not configured.');
    }

    try {
      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1024x1024',
        quality: 'hd',
      });

      const imageUrl = response.data?.[0]?.url;
      
      if (!imageUrl) {
        throw new Error('OpenAI returned an empty image URL.');
      }

      return imageUrl;
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(
          `Error generating image with DALL-E 3: ${error.message}`,
        );
      } else {
        this.logger.error('Error generating image with DALL-E 3', error);
      }
      throw new Error('Fallo al generar imagen con IA.');
    }
  }
}
