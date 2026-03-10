import { Injectable, Logger } from '@nestjs/common';
import { ILeadAnalyzerPort } from '../../domain/ports/lead-analyzer.port';

@Injectable()
export class OpenAiAnalyzerAdapter implements ILeadAnalyzerPort {
  private readonly logger = new Logger(OpenAiAnalyzerAdapter.name);

  // IP Pública de tu Servidor AWS corriendo OpenClaw Gateway
  private readonly OPENCLAW_API_URL =
    'http://18.234.29.184:8000/api/v1/analyze';

  async analyzeLeadIntent(messages: string[]): Promise<{
    score: number;
    summary: string;
    status: 'NEW' | 'CONTACTED' | 'WARM' | 'COLD';
  }> {
    // 1. Preparar el Payload DTO exacto que le prometimos a Charlie (OpenClaw)
    const payload = {
      businessContext: 'Clínica de Medicina Integrativa y Estética',
      conversationId: 'demo-ig-' + Date.now(),
      senderId: 'instagram_user_demo',
      messages: messages.map((text, index) => ({
        senderRole: index % 2 === 0 ? 'LEAD' : 'BRAND',
        text,
        timestamp: new Date().toISOString(),
      })),
    };

    try {
      this.logger.log(
        `Enviando conversación a AWS OpenClaw (${this.OPENCLAW_API_URL})...`,
      );
      this.logger.debug(payload);

      // 2. Hacer la llamada HTTP real (Descomentar cuando validemos el endpoint exacto de OpenClaw)
      /*
      const response = await fetch(this.OPENCLAW_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`Error de OpenClaw: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        score: result.confidenceScore || 0,
        summary: result.summary || 'Respuesta generada por IA',
        status: result.leadScore === 'SPAM' ? 'COLD' : result.leadScore || 'NEW',
      };
      */

      // -- MOCK TEMPORAL MIENTRAS VALIDAMOS LA CONEXIÓN HTTP DE AWS --
      await Promise.resolve();
      const lastMessage = messages[messages.length - 1]?.toLowerCase() || '';
      let score = 50;
      let summary = 'Interés general (Mock)';
      let status: 'NEW' | 'CONTACTED' | 'WARM' | 'COLD' = 'CONTACTED';

      if (lastMessage.includes('precio') || lastMessage.includes('comprar')) {
        score = 95;
        summary = 'Alta intención de compra (Mock)';
        status = 'WARM';
      }

      return { score, summary, status };
    } catch (error) {
      this.logger.error('Fallo al conectar con OpenClaw en AWS', error);
      return {
        score: 0,
        summary: 'Error de análisis',
        status: 'NEW',
      };
    }
  }
}
