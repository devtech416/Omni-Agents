import { Module } from '@nestjs/common';
import { GenerateContentDraftUseCase } from './application/use-cases/generate-content-draft.use-case';
import { GeminiAdapter } from './infrastructure/adapters/gemini.adapter';
import { OpenAiAdapter } from './infrastructure/adapters/openai.adapter';
import { ContentDraftPrismaRepository } from './infrastructure/adapters/content-draft.repository';
import { AI_GENERATOR_PORT } from './domain/ports/ai-generator.port';
import { IMAGE_GENERATOR_PORT } from './domain/ports/image-generator.port';
import { CONTENT_DRAFT_REPOSITORY } from './domain/ports/content-draft.repository';
import { ContentDraftsController } from './infrastructure/controllers/content-drafts.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ContentDraftsController],
  providers: [
    {
      provide: AI_GENERATOR_PORT,
      useClass: GeminiAdapter,
    },
    {
      provide: CONTENT_DRAFT_REPOSITORY,
      useClass: ContentDraftPrismaRepository,
    },
    {
      provide: IMAGE_GENERATOR_PORT,
      useClass: OpenAiAdapter,
    },
    {
      provide: 'GEMINI_API_KEY',
      useValue: process.env.GEMINI_API_KEY || '',
    },
    {
      provide: 'OPENAI_API_KEY',
      useValue: process.env.OPENAI_API_KEY || '',
    },
    GenerateContentDraftUseCase,
  ],
  exports: [GenerateContentDraftUseCase],
})
export class ContentCreatorModule {}
