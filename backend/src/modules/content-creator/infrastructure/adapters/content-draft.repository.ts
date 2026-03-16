import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../instagram-lead-qualifier/infrastructure/adapters/prisma.service';
import {
  ContentDraftRepository,
  ContentDraftEntity,
} from '../../domain/ports/content-draft.repository';

@Injectable()
export class ContentDraftPrismaRepository implements ContentDraftRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveDraft(
    draft: Omit<ContentDraftEntity, 'id'>,
  ): Promise<ContentDraftEntity> {
    const saved = await this.prisma.client.contentDraft.create({
      data: {
        topic: draft.topic,
        content: draft.content,
        prompt: draft.prompt,
        status: draft.status,
        platform: draft.platform,
        imageUrl: draft.imageUrl || null,
        folder: draft.folder || null,
        category: draft.category || null,
      },
    });

    return {
      id: saved.id,
      topic: saved.topic,
      content: saved.content,
      prompt: saved.prompt || undefined,
      imageUrl: saved.imageUrl || undefined,
      status: saved.status as ContentDraftEntity['status'],
      platform: saved.platform,
      folder: saved.folder || undefined,
      category: saved.category || undefined,
    };
  }
}
