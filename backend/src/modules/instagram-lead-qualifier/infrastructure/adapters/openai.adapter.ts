import { Injectable } from '@nestjs/common';
import { ILeadAnalyzerPort } from '../../domain/ports/lead-analyzer.port';

@Injectable()
export class OpenAiAnalyzerAdapter implements ILeadAnalyzerPort {
  async analyzeLeadIntent(messages: string[]): Promise<{
    score: number;
    summary: string;
    status: 'NEW' | 'CONTACTED' | 'WARM' | 'COLD';
  }> {
    // Phase 1 Mock: Simulating an OpenClaw/OpenAI response
    await Promise.resolve(); // Fix async warning
    const lastMessage = messages[messages.length - 1].toLowerCase();

    let score = 10;
    let summary = 'Lead showing basic interest.';
    let status: 'NEW' | 'CONTACTED' | 'WARM' | 'COLD' = 'NEW';

    if (
      lastMessage.includes('buy') ||
      lastMessage.includes('price') ||
      lastMessage.includes('comprar') ||
      lastMessage.includes('precio')
    ) {
      score = 95;
      summary = 'High intent. Asked for pricing or purchase info.';
      status = 'WARM';
    } else if (lastMessage.includes('info') || lastMessage.includes('more')) {
      score = 50;
      summary = 'Medium intent. Asking for general information.';
      status = 'CONTACTED';
    }

    // In Phase 2, this will be an HTTP call to the remote OpenClaw VM:
    // const response = await axios.post('http://openclaw-vm-ip:port/api/v1/analyze', { text: lastMessage });

    return {
      score,
      summary,
      status,
    };
  }
}
