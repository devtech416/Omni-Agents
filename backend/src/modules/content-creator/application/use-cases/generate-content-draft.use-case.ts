import { Injectable, Inject } from '@nestjs/common';
import {
  AiGeneratorPort,
  AI_GENERATOR_PORT,
} from '../../domain/ports/ai-generator.port';
import {
  ImageGeneratorPort,
  IMAGE_GENERATOR_PORT,
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
    @Inject(IMAGE_GENERATOR_PORT)
    private readonly imageGenerator: ImageGeneratorPort,
    @Inject(CONTENT_DRAFT_REPOSITORY)
    private readonly repository: ContentDraftRepository,
  ) {}

  async execute(topic: string): Promise<ContentDraftEntity> {
    // 1. Generate text and image prompt using Gemini
    const generated = await this.aiGenerator.generatePostContent(topic);

    // 2. Generate the actual image using DALL-E 3 (OpenAI)
    const imageUrl = await this.imageGenerator.generateImage(
      generated.imagePrompt,
    );

    // 3. Map to domain entity format and save as draft
    const draft = await this.repository.saveDraft({
      topic,
      content: generated.content,
      prompt: generated.imagePrompt,
      imageUrl,
      status: 'PENDING_REVIEW',
      platform: 'INSTAGRAM',
    });

    return draft;
  }
}
