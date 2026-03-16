/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger, Inject } from '@nestjs/common';
import axios from 'axios';
import { ImageGeneratorPort } from '../../domain/ports/image-generator.port';

@Injectable()
export class CanvaAdapter implements ImageGeneratorPort {
  private readonly logger = new Logger(CanvaAdapter.name);

  constructor(
    @Inject('CANVA_API_KEY') private readonly apiKey: string,
    @Inject('CANVA_TEMPLATE_ID') private readonly defaultTemplateId: string,
  ) {
    if (!this.apiKey || !this.defaultTemplateId) {
      this.logger.warn(
        'CANVA_API_KEY or CANVA_TEMPLATE_ID is missing. Canva generation will fail.',
      );
    }
  }

  async generateImage(prompt: string): Promise<string> {
    if (!this.apiKey || !this.defaultTemplateId) {
      throw new Error(
        'La API de Canva o el Template ID no están configurados en el archivo .env',
      );
    }

    this.logger.log(
      `Iniciando generación con Canva Autofill API para el texto: ${prompt}`,
    );

    try {
      // 1. Iniciar el trabajo de AutoFill (Inyectar el texto generado en la plantilla)
      const autofillResponse = await axios.post(
        'https://api.canva.com/rest/v1/autofills',
        {
          brand_template_id: this.defaultTemplateId,
          data: {
            HeadlineText: {
              type: 'text',
              text: prompt, // El texto de marketing que ha generado Gemini
            },
          },
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const designId = autofillResponse.data.job.result.design.id;
      this.logger.log(
        `Diseño creado en Canva: ${designId}. Solicitando exportación a imagen...`,
      );

      // 2. Iniciar el trabajo de Exportación (Convertir el diseño a JPG/PNG)
      const exportResponse = await axios.post(
        'https://api.canva.com/rest/v1/exports',
        {
          design_id: designId,
          format: { type: 'jpg', quality: 90 },
        },
        {
          headers: { Authorization: `Bearer ${this.apiKey}` },
        },
      );

      const exportJobId = exportResponse.data.job.id;

      // 3. Polling (Consultar el estado de la exportación hasta que termine)
      let exportStatus = 'in_progress';
      let downloadUrl = '';

      while (exportStatus === 'in_progress' || exportStatus === 'starting') {
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Esperar 1.5s

        const statusResponse = await axios.get(
          `https://api.canva.com/rest/v1/exports/${exportJobId}`,
          { headers: { Authorization: `Bearer ${this.apiKey}` } },
        );

        exportStatus = statusResponse.data.job.status;

        if (exportStatus === 'success') {
          downloadUrl = statusResponse.data.job.urls[0]; // La URL de descarga final
        } else if (exportStatus === 'failed') {
          throw new Error('Fallo la exportación en Canva.');
        }
      }

      this.logger.log(
        `Generación y exportación de Canva completada con éxito.`,
      );
      return downloadUrl;
    } catch (error: any) {
      this.logger.error(
        'Error generando diseño con Canva',
        error.response?.data || error.message,
      );
      throw new Error(
        'Fallo al generar diseño con la API de Canva. ' +
          (error.response?.data?.message || ''),
      );
    }
  }
}
