import { Injectable, Inject } from '@nestjs/common';
import {
  AiGeneratorPort,
  AI_GENERATOR_PORT,
} from '../../domain/ports/ai-generator.port';
import {
  ImageGeneratorPort,
  OPENAI_GENERATOR_PORT,
  CANVA_GENERATOR_PORT,
} from '../../domain/ports/image-generator.port';
import {
  ContentDraftRepository,
  CONTENT_DRAFT_REPOSITORY,
  ContentDraftEntity,
} from '../../domain/ports/content-draft.repository';

@Injectable()
export class GenerateContentDraftUseCase {
  constructor(
    @Inject(AI_GENERATOR_PORT)
    private readonly aiGenerator: AiGeneratorPort,
    @Inject(OPENAI_GENERATOR_PORT)
    private readonly openAiGenerator: ImageGeneratorPort,
    @Inject(CANVA_GENERATOR_PORT)
    private readonly canvaGenerator: ImageGeneratorPort,
    @Inject(CONTENT_DRAFT_REPOSITORY)
    private readonly repository: ContentDraftRepository,
  ) {}

  async execute(
    topic: string,
    referenceImageUrl?: string,
    folder?: string,
    category?: string,
    engine: 'DALL-E' | 'CANVA' = 'DALL-E',
  ): Promise<ContentDraftEntity> {
    // 1. Generate text and image prompt using Gemini
    const generated = await this.aiGenerator.generatePostContent(
      topic,
      referenceImageUrl,
    );

    // 2. Generate the actual image using DALL-E 3 or Canva API
    const activeGenerator =
      engine === 'CANVA' ? this.canvaGenerator : this.openAiGenerator;
    const imageUrl = await activeGenerator.generateImage(
      engine === 'CANVA' ? topic : generated.imagePrompt,
    );

    // 3. Map to domain entity format and save as draft
    const draft = await this.repository.saveDraft({
      topic,
      content: generated.content,
      prompt: generated.imagePrompt,
      imageUrl,
      status: 'PENDING_REVIEW',
      platform: 'INSTAGRAM',
      folder,
      category,
    });

    return draft;
  }
}
