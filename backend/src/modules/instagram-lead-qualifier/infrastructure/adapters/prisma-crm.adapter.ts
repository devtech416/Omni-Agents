import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ICrmRepositoryPort } from '../../domain/ports/crm-repository.port';
import { LeadEntity } from '../../domain/entities/lead.entity';
import { InstagramMessageEntity } from '../../domain/entities/instagram-message.entity';

@Injectable()
export class PrismaCrmAdapter implements ICrmRepositoryPort {
  private readonly prisma = new PrismaClient();

  async findByInstagramHandle(handle: string): Promise<LeadEntity | null> {
    const data = await this.prisma.lead.findUnique({
      where: { instagramHandle: handle },
    });

    if (!data) return null;

    return new LeadEntity(
      data.id,
      data.instagramHandle,
      data.fullName,
      data.status,
      data.priorityScore,
      data.aiSummary,
      data.createdAt,
      data.updatedAt,
    );
  }

  async saveLead(lead: LeadEntity): Promise<void> {
    await this.prisma.lead.upsert({
      where: { id: lead.id },
      update: {
        instagramHandle: lead.instagramHandle,
        fullName: lead.fullName,
        status: lead.status,
        priorityScore: lead.priorityScore,
        aiSummary: lead.aiSummary,
        updatedAt: lead.updatedAt,
      },
      create: {
        id: lead.id,
        instagramHandle: lead.instagramHandle,
        fullName: lead.fullName,
        status: lead.status,
        priorityScore: lead.priorityScore,
        aiSummary: lead.aiSummary,
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
      },
    });
  }

  async saveMessage(message: InstagramMessageEntity): Promise<void> {
    await this.prisma.instagramMessage.create({
      data: {
        id: message.id,
        leadId: message.leadId,
        senderId: message.senderId,
        text: message.text,
        direction: message.direction,
        timestamp: message.timestamp,
      },
    });
  }
}
