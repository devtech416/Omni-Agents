import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma';
import { TelegramAdapter } from './infrastructure/adapters/telegram.adapter';
import { TelegramInteractionRepository } from './infrastructure/adapters/telegram-interaction.repository';
import { ProcessTelegramCommandUseCase } from './application/use-cases/process-telegram-command.use-case';
import { ORCHESTRATOR_REPOSITORY } from './domain/orchestrator.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    TelegramAdapter,
    {
      provide: ORCHESTRATOR_REPOSITORY,
      useClass: TelegramInteractionRepository,
    },
    {
      provide: 'TELEGRAM_BOT_TOKEN',
      useValue: process.env.TELEGRAM_BOT_TOKEN || '',
    },
    {
      provide: 'TELEGRAM_ADMIN_CHAT_ID',
      useValue: process.env.TELEGRAM_ADMIN_CHAT_ID || '',
    },
    ProcessTelegramCommandUseCase,
  ],
  exports: [ProcessTelegramCommandUseCase],
})
export class OrchestratorModule {}
