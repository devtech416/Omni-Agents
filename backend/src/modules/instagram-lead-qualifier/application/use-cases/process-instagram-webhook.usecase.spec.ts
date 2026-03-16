/* eslint-disable @typescript-eslint/unbound-method, @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { ProcessInstagramWebhookUseCase } from './process-instagram-webhook.usecase';
import {
  CRM_REPOSITORY_PORT,
  ICrmRepositoryPort,
} from '../../domain/ports/crm-repository.port';
import {
  ILeadAnalyzerPort,
  LEAD_ANALYZER_PORT,
} from '../../domain/ports/lead-analyzer.port';
import { InstagramWebhookPayloadDto } from '../dtos/webhook-payload.dto';
import { LeadEntity } from '../../domain/entities/lead.entity';

describe('ProcessInstagramWebhookUseCase', () => {
  let useCase: ProcessInstagramWebhookUseCase;
  let crmRepository: jest.Mocked<ICrmRepositoryPort>;
  let leadAnalyzer: jest.Mocked<ILeadAnalyzerPort>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProcessInstagramWebhookUseCase,
        {
          provide: CRM_REPOSITORY_PORT,
          useValue: {
            findByInstagramHandle: jest.fn(),
            saveLead: jest.fn(),
            saveMessage: jest.fn(),
          },
        },
        {
          provide: LEAD_ANALYZER_PORT,
          useValue: {
            analyzeLeadIntent: jest.fn(),
          },
        },
      ],
    }).compile();

    useCase = module.get<ProcessInstagramWebhookUseCase>(
      ProcessInstagramWebhookUseCase,
    );
    crmRepository = module.get(CRM_REPOSITORY_PORT);
    leadAnalyzer = module.get(LEAD_ANALYZER_PORT);
  });

  const mockPayload: InstagramWebhookPayloadDto = {
    object: 'instagram',
    entry: [
      {
        id: '123',
        time: 1234567890,
        messaging: [
          {
            sender: { id: 'user_123' },
            recipient: { id: 'page_123' },
            timestamp: 1234567890,
            message: {
              mid: 'mid_123',
              text: 'Hello, I want to buy your product!',
            },
          },
        ],
      },
    ],
  };

  it('should create a new lead and save the message if the user does not exist', async () => {
    crmRepository.findByInstagramHandle.mockResolvedValue(null);
    leadAnalyzer.analyzeLeadIntent.mockResolvedValue({
      score: 90,
      summary: 'Wants to buy product',
      status: 'HOT' as any,
    });

    await useCase.execute(mockPayload);

    expect(crmRepository.findByInstagramHandle).toHaveBeenCalledWith(
      'user_123',
    );
    expect(crmRepository.saveLead).toHaveBeenCalled();
    expect(crmRepository.saveMessage).toHaveBeenCalled();
    expect(leadAnalyzer.analyzeLeadIntent).toHaveBeenCalledWith([
      'Hello, I want to buy your product!',
    ]);

    const savedLeadInfo = crmRepository.saveLead.mock.calls[0][0];
    expect(savedLeadInfo.priorityScore).toBe(90);
    expect(savedLeadInfo.aiSummary).toBe('Wants to buy product');
  });

  it('should update an existing lead and save the message if the user exists', async () => {
    const existingLead = LeadEntity.create('user_123');
    crmRepository.findByInstagramHandle.mockResolvedValue(existingLead);
    leadAnalyzer.analyzeLeadIntent.mockResolvedValue({
      score: 50,
      summary: 'Asking for more info',
      status: 'WARM' as any,
    });

    await useCase.execute(mockPayload);

    expect(crmRepository.findByInstagramHandle).toHaveBeenCalledWith(
      'user_123',
    );
    expect(crmRepository.saveLead).toHaveBeenCalled(); // Update
    expect(crmRepository.saveMessage).toHaveBeenCalled();

    const updatedLeadInfo = crmRepository.saveLead.mock.calls[0][0];
    expect(updatedLeadInfo.priorityScore).toBe(50);
    expect(updatedLeadInfo.aiSummary).toBe('Asking for more info');
  });
});
