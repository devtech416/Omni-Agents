import { Module } from '@nestjs/common';
import { PrismaService } from '../instagram-lead-qualifier/infrastructure/adapters/prisma.service';
import { GenerateContentDraftUseCase } from './application/use-cases/generate-content-draft.use-case';
import { GeminiAdapter } from './infrastructure/adapters/gemini.adapter';
import { OpenAiAdapter } from './infrastructure/adapters/openai.adapter';
import { CanvaAdapter } from './infrastructure/adapters/canva.adapter';
import { ContentDraftPrismaRepository } from './infrastructure/adapters/content-draft.repository';
import { AI_GENERATOR_PORT } from './domain/ports/ai-generator.port';
import {
  OPENAI_GENERATOR_PORT,
  CANVA_GENERATOR_PORT,
} from './domain/ports/image-generator.port';
import { CONTENT_DRAFT_REPOSITORY } from './domain/ports/content-draft.repository';
import { ContentDraftsController } from './infrastructure/controllers/content-drafts.controller';

@Module({
  controllers: [ContentDraftsController],
  providers: [
    PrismaService,
    {
      provide: AI_GENERATOR_PORT,
      useClass: GeminiAdapter,
    },
    {
      provide: CONTENT_DRAFT_REPOSITORY,
      useClass: ContentDraftPrismaRepository,
    },
    {
      provide: OPENAI_GENERATOR_PORT,
      useClass: OpenAiAdapter,
    },
    {
      provide: CANVA_GENERATOR_PORT,
      useClass: CanvaAdapter,
    },
    {
      provide: 'GEMINI_API_KEY',
      useFactory: () => process.env.GEMINI_API_KEY || '',
    },
    {
      provide: 'OPENAI_API_KEY',
      useFactory: () => process.env.OPENAI_API_KEY || '',
    },
    {
      provide: 'CANVA_API_KEY',
      useFactory: () => process.env.CANVA_API_KEY || '',
    },
    {
      provide: 'CANVA_TEMPLATE_ID',
      useFactory: () => process.env.CANVA_TEMPLATE_ID || '',
    },
    GenerateContentDraftUseCase,
  ],
  exports: [GenerateContentDraftUseCase],
})
export class ContentCreatorModule {}
