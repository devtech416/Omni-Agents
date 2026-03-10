import { Injectable, Inject } from '@nestjs/common';
import { InstagramWebhookPayloadDto } from '../dtos/webhook-payload.dto';
import {
  CRM_REPOSITORY_PORT,
  ICrmRepositoryPort,
} from '../../domain/ports/crm-repository.port';
import {
  ILeadAnalyzerPort,
  LEAD_ANALYZER_PORT,
} from '../../domain/ports/lead-analyzer.port';
import { LeadEntity } from '../../domain/entities/lead.entity';
import { InstagramMessageEntity } from '../../domain/entities/instagram-message.entity';

@Injectable()
export class ProcessInstagramWebhookUseCase {
  constructor(
    @Inject(CRM_REPOSITORY_PORT)
    private readonly crmRepository: ICrmRepositoryPort,
    @Inject(LEAD_ANALYZER_PORT)
    private readonly leadAnalyzer: ILeadAnalyzerPort,
  ) {}

  async execute(payload: InstagramWebhookPayloadDto): Promise<void> {
    for (const entry of payload.entry) {
      for (const messaging of entry.messaging) {
        if (!messaging.message || !messaging.message.text) {
          continue; // Not a text message
        }

        const senderId = messaging.sender.id;
        const text = messaging.message.text;

        // 1. Fetch or Create Lead
        let lead = await this.crmRepository.findByInstagramHandle(senderId);
        if (!lead) {
          lead = LeadEntity.create(senderId);
          await this.crmRepository.saveLead(lead); // Save initially to get an ID for the message
        }

        // 2. Save the Inbound Message
        const message = InstagramMessageEntity.createInbound(
          lead.id,
          senderId,
          text,
        );
        await this.crmRepository.saveMessage(message);

        // 3. Analyze Intent with LLM (or mock for now)
        // Note: In a real app we might fetch the last N messages for context
        const analysis = await this.leadAnalyzer.analyzeLeadIntent([text]);

        // 4. Update Lead with AI insights
        lead.updateScore(analysis.score);
        // Note: 'HOT' isn't explicitly in the type right now, it's NEW/CONTACTED/WARM/COLD. We'll map HOT -> WARM or expand type in entity.
        // Assuming the analyzer returns valid status types.
        lead.updateStatus(
          analysis.status === ('HOT' as any) ? 'WARM' : analysis.status,
        );
        lead.aiSummary = analysis.summary;

        // 5. Save updated lead
        await this.crmRepository.saveLead(lead);
      }
    }
  }
}
