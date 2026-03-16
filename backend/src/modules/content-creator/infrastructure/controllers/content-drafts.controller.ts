import { Controller, Get, Patch, Param, Body, Post, Put } from '@nestjs/common';
import { PrismaService } from '../../../instagram-lead-qualifier/infrastructure/adapters/prisma.service';
import { GenerateContentDraftUseCase } from '../../application/use-cases/generate-content-draft.use-case';

@Controller('api/content-drafts')
export class ContentDraftsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly generateContentDraftUseCase: GenerateContentDraftUseCase,
  ) {}

  @Post('generate')
  async generateDraft(
    @Body()
    body: {
      topic: string;
      referenceImageUrl?: string;
      folder?: string;
      category?: string;
      engine?: 'DALL-E' | 'CANVA';
    },
  ) {
    return this.generateContentDraftUseCase.execute(
      body.topic,
      body.referenceImageUrl,
      body.folder,
      body.category,
      body.engine || 'DALL-E',
    );
  }

  @Get()
  async getPendingDrafts() {
    return this.prisma.client.contentDraft.findMany({
      where: {
        status: 'PENDING_REVIEW',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get('approved')
  async getApprovedDrafts() {
    return this.prisma.client.contentDraft.findMany({
      where: {
        status: 'APPROVED',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Get('by-folder/:folderName')
  async getDraftsByFolder(@Param('folderName') folderName: string) {
    return this.prisma.client.contentDraft.findMany({
      where: {
        folder: folderName,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Patch(':id/approve')
  async approveDraft(@Param('id') id: string) {
    // Al aprobarlo, solo cambia de estado para que lo uses manualmente
    return this.prisma.client.contentDraft.update({
      where: { id },
      data: {
        status: 'APPROVED',
      },
    });
  }

  @Patch(':id/reject')
  async rejectDraft(@Param('id') id: string) {
    return this.prisma.client.contentDraft.update({
      where: { id },
      data: {
        status: 'REJECTED',
      },
    });
  }

  @Put(':id')
  async updateDraft(
    @Param('id') id: string,
    @Body() body: { content?: string; folder?: string; category?: string },
  ) {
    return this.prisma.client.contentDraft.update({
      where: { id },
      data: {
        content: body.content,
        folder: body.folder,
        category: body.category,
      },
    });
  }
}
