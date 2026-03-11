import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Delete,
  Param,
  Query,
  HttpException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { InstagramWebhookPayloadDto } from '../../application/dtos/webhook-payload.dto';
import { ProcessInstagramWebhookUseCase } from '../../application/use-cases/process-instagram-webhook.usecase';
import { PrismaService } from '../adapters/prisma.service';

@ApiTags('Instagram Webhooks')
@Controller('api/webhooks/instagram')
export class InstagramWebhookController {
  constructor(
    private readonly processWebhookUseCase: ProcessInstagramWebhookUseCase,
    private readonly prisma: PrismaService, // Temp for the GET leads endpoint
  ) {}

  // ---- META VERIFICATION ENDPOINT ----
  // Meta throws a GET request here when you register the webhook in the Developer Portal
  @Get()
  @ApiOperation({ summary: 'Verify Webhook from Meta' })
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.verify_token') token: string,
    @Query('hub.challenge') challenge: string,
    @Res() res: Response,
  ) {
    const VERIFY_TOKEN = 'omni_agents_super_secret_token_123'; // Debes poner esto mismo en el portal de Meta

    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('✅ WEBHOOK VERIFIED BY META');
      return res.status(200).send(challenge); // Tienes que devolver el challenge exacto para que Meta te apruebe
    }

    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Receive Instagram DM Webhook from Meta' })
  @ApiBody({ type: InstagramWebhookPayloadDto })
  @ApiResponse({ status: 200, description: 'EVENT_RECEIVED' })
  async handleWebhook(
    @Body() payload: InstagramWebhookPayloadDto,
  ): Promise<string> {
    console.log('\n--- 📥 NUEVO WEBHOOK RECIBIDO DE META ---');
    console.log(JSON.stringify(payload, null, 2));

    if (payload.object === 'instagram') {
      await this.processWebhookUseCase.execute(payload);
      return 'EVENT_RECEIVED';
    }
    return 'EVENT_IGNORED';
  }

  // Exposed for the Frontend Table
  @Get('leads')
  @ApiOperation({ summary: 'Get all qualified leads for the Dashboard' })
  @ApiResponse({
    status: 200,
    description: 'List of leads returned successfully',
  })
  async getLeads() {
    return this.prisma.client.lead.findMany({
      orderBy: { priorityScore: 'desc' },
      include: {
        messages: {
          orderBy: { timestamp: 'desc' },
          take: 1,
        },
      },
    });
  }

  // Exposed for the Frontend Table Action
  @Delete('leads/:id')
  @ApiOperation({ summary: 'Delete a lead from the Database' })
  @ApiResponse({
    status: 200,
    description: 'Lead deleted successfully',
  })
  async deleteLead(@Param('id') id: string) {
    await this.prisma.client.lead.delete({
      where: { id },
    });
    return { success: true };
  }
}
