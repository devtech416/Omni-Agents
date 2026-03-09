import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { InstagramWebhookPayloadDto } from '../../application/dtos/webhook-payload.dto';
import { ProcessInstagramWebhookUseCase } from '../../application/use-cases/process-instagram-webhook.usecase';
import { PrismaClient } from '@prisma/client';

@ApiTags('Instagram Webhooks')
@Controller('api/webhooks/instagram')
export class InstagramWebhookController {
  private readonly prisma = new PrismaClient(); // Temp for the GET leads endpoint

  constructor(
    private readonly processWebhookUseCase: ProcessInstagramWebhookUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive Instagram DM Webhook from Meta' })
  @ApiBody({ type: InstagramWebhookPayloadDto })
  @ApiResponse({ status: 200, description: 'EVENT_RECEIVED' })
  async handleWebhook(@Body() payload: InstagramWebhookPayloadDto): Promise<string> {
    if (payload.object === 'instagram') {
      await this.processWebhookUseCase.execute(payload);
      return 'EVENT_RECEIVED';
    }
    return 'EVENT_IGNORED';
  }

  // Exposed for the Frontend Table
  @Get('leads')
  @ApiOperation({ summary: 'Get all qualified leads for the Dashboard' })
  @ApiResponse({ status: 200, description: 'List of leads returned successfully' })
  async getLeads() {
    return this.prisma.lead.findMany({
      orderBy: { priorityScore: 'desc' },
      include: {
        messages: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        }
      }
    });
  }
}
