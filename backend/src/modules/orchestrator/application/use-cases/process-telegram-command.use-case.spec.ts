/* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-argument */
import { ProcessTelegramCommandUseCase } from './process-telegram-command.use-case';
import { OrchestratorRepository } from '../../domain/orchestrator.repository';
// import { SubAgentRouterPort } from '../ports/sub-agent-router.port';

describe('ProcessTelegramCommandUseCase', () => {
  let useCase: ProcessTelegramCommandUseCase;
  let mockRepository: jest.Mocked<OrchestratorRepository>;
  let mockGenerateContentUseCase: any;
  const ADMIN_CHAT_ID = '123456';

  beforeEach(() => {
    mockRepository = {
      saveInteraction: jest.fn().mockResolvedValue({ id: 'any-id' }),
      updateInteractionStatus: jest.fn(),
    };

    mockGenerateContentUseCase = {
      execute: jest.fn(),
    };

    useCase = new ProcessTelegramCommandUseCase(
      mockRepository,
      ADMIN_CHAT_ID,
      mockGenerateContentUseCase,
    );
  });

  it('should reject commands from unauthorized chat IDs', async () => {
    const rawText = '/createpost test';

    await expect(useCase.execute('999999', rawText)).rejects.toThrow(
      'Unauthorized chat ID',
    );
    expect(mockRepository.saveInteraction).not.toHaveBeenCalled();
  });

  it('should accept valid commands from the admin chat ID and save interaction', async () => {
    const rawText = '/createpost Beneficios de automatizar';

    await useCase.execute(ADMIN_CHAT_ID, rawText);

    expect(mockRepository.saveInteraction).toHaveBeenCalledWith({
      chatId: ADMIN_CHAT_ID,
      command: '/createpost',
      payload: 'Beneficios de automatizar',
      status: 'RECEIVED',
    });
  });

  it('should ignore non-commands from the admin chat ID', async () => {
    const rawText = 'Solo estoy hablando';

    await expect(useCase.execute(ADMIN_CHAT_ID, rawText)).rejects.toThrow(
      'Not a valid command',
    );
  });
});
