import { Module } from '@nestjs/common';
import { InstagramWebhookController } from './infrastructure/controllers/webhook.controller';
import { ProcessInstagramWebhookUseCase } from './application/use-cases/process-instagram-webhook.usecase';
import { CRM_REPOSITORY_PORT } from './domain/ports/crm-repository.port';
import { PrismaCrmAdapter } from './infrastructure/adapters/prisma-crm.adapter';
import { LEAD_ANALYZER_PORT } from './domain/ports/lead-analyzer.port';
import { OpenAiAnalyzerAdapter } from './infrastructure/adapters/openai.adapter';
import { PrismaService } from './infrastructure/adapters/prisma.service';
import { INSTAGRAM_API_PORT } from './domain/ports/instagram-api.port';
import { MetaGraphApiAdapter } from './infrastructure/adapters/meta-graph-api.adapter';

@Module({
  controllers: [InstagramWebhookController],
  providers: [
    PrismaService,
    ProcessInstagramWebhookUseCase,
    {
      provide: CRM_REPOSITORY_PORT,
      useClass: PrismaCrmAdapter,
    },
    {
      provide: LEAD_ANALYZER_PORT,
      useClass: OpenAiAnalyzerAdapter,
    },
    {
      provide: INSTAGRAM_API_PORT,
      useClass: MetaGraphApiAdapter,
    },
  ],
})
export class InstagramLeadQualifierModule {}
