import { Module } from '@nestjs/common';
import { InstagramWebhookController } from './infrastructure/controllers/webhook.controller';
import { ProcessInstagramWebhookUseCase } from './application/use-cases/process-instagram-webhook.usecase';
import { CRM_REPOSITORY_PORT } from './domain/ports/crm-repository.port';
import { PrismaCrmAdapter } from './infrastructure/adapters/prisma-crm.adapter';
import { LEAD_ANALYZER_PORT } from './domain/ports/lead-analyzer.port';
import { OpenAiAnalyzerAdapter } from './infrastructure/adapters/openai.adapter';

@Module({
  controllers: [InstagramWebhookController],
  providers: [
    ProcessInstagramWebhookUseCase,
    {
      provide: CRM_REPOSITORY_PORT,
      useClass: PrismaCrmAdapter,
    },
    {
      provide: LEAD_ANALYZER_PORT,
      useClass: OpenAiAnalyzerAdapter,
    },
  ],
})
export class InstagramLeadQualifierModule {}
