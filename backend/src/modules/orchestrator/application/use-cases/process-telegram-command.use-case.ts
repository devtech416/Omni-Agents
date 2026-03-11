import { Injectable, Inject } from '@nestjs/common';
import { OrchestratorRepository, ORCHESTRATOR_REPOSITORY } from '../../domain/orchestrator.repository';
import { TelegramCommand } from '../../domain/telegram-command';
import { GenerateContentDraftUseCase } from '../../../content-creator/application/use-cases/generate-content-draft.use-case';

@Injectable()
export class ProcessTelegramCommandUseCase {
  constructor(
    @Inject(ORCHESTRATOR_REPOSITORY)
    private readonly orchestratorRepository: OrchestratorRepository,
    @Inject('TELEGRAM_ADMIN_CHAT_ID')
    private readonly adminChatId: string,
    private readonly generateContentDraftUseCase: GenerateContentDraftUseCase,
  ) {}

  async execute(chatId: string, rawText: string): Promise<void> {
    if (chatId !== this.adminChatId) {
      throw new Error('Unauthorized chat ID');
    }

    const command = new TelegramCommand(rawText);

    if (!command.getCommand()) {
      throw new Error('Not a valid command');
    }

    const interaction = await this.orchestratorRepository.saveInteraction({
      chatId,
      command: command.getCommand(),
      payload: command.getPayload(),
      status: 'PROCESSING',
    });

    if (command.getCommand() === '/createpost') {
      try {
        await this.generateContentDraftUseCase.execute(command.getPayload());
        await this.orchestratorRepository.updateInteractionStatus(interaction.id, 'COMPLETED');
      } catch (error) {
        await this.orchestratorRepository.updateInteractionStatus(interaction.id, 'FAILED');
        throw error;
      }
    } else {
       // Other commands placeholder
       await this.orchestratorRepository.updateInteractionStatus(interaction.id, 'COMPLETED');
    }
  }
}
