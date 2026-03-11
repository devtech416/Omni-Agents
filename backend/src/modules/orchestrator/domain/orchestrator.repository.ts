export interface TelegramInteraction {
  id: string;
  chatId: string;
  command: string;
  payload?: string;
  status: 'RECEIVED' | 'PROCESSING' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
  updatedAt: Date;
}

export const ORCHESTRATOR_REPOSITORY = Symbol('ORCHESTRATOR_REPOSITORY');

export interface OrchestratorRepository {
  saveInteraction(interaction: Omit<TelegramInteraction, 'id' | 'createdAt' | 'updatedAt'>): Promise<TelegramInteraction>;
  updateInteractionStatus(id: string, status: TelegramInteraction['status']): Promise<void>;
}
