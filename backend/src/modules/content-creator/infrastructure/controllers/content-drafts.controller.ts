import { Controller, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { PrismaService } from 'prisma';

@Controller('api/content-drafts')
export class ContentDraftsController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async getPendingDrafts() {
    return this.prisma.contentDraft.findMany({
      where: {
        status: 'PENDING_REVIEW',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  @Patch(':id/approve')
  async approveDraft(@Param('id') id: string) {
    // Basic logic to approve it. In the future this might post to Instagram
    return this.prisma.contentDraft.update({
      where: { id },
      data: {
        status: 'APPROVED',
      },
    });
  }
}
