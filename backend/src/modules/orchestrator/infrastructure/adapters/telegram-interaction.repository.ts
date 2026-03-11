import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma';
import { OrchestratorRepository, TelegramInteraction } from '../domain/orchestrator.repository';

@Injectable()
export class TelegramInteractionRepository implements OrchestratorRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveInteraction(interaction: Omit<TelegramInteraction, 'id' | 'createdAt' | 'updatedAt'>): Promise<TelegramInteraction> {
    const saved = await this.prisma.telegramInteraction.create({
      data: {
        chatId: interaction.chatId,
        command: interaction.command,
        payload: interaction.payload || null,
        status: interaction.status,
      },
    });

    return {
      id: saved.id,
      chatId: saved.chatId,
      command: saved.command,
      payload: saved.payload ?? undefined,
      status: saved.status as TelegramInteraction['status'],
      createdAt: saved.createdAt,
      updatedAt: saved.updatedAt,
    };
  }

  async updateInteractionStatus(id: string, status: TelegramInteraction['status']): Promise<void> {
    await this.prisma.telegramInteraction.update({
      where: { id },
      data: { status },
    });
  }
}
