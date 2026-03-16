/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-floating-promises */
import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { ProcessTelegramCommandUseCase } from '../../application/use-cases/process-telegram-command.use-case';

@Injectable()
export class TelegramAdapter implements OnModuleInit {
  private readonly logger = new Logger(TelegramAdapter.name);
  private bot: Telegraf;

  constructor(
    @Inject('TELEGRAM_BOT_TOKEN') private readonly botToken: string,
    private readonly processCommandUseCase: ProcessTelegramCommandUseCase,
  ) {
    if (this.botToken) {
      this.bot = new Telegraf(this.botToken);
    } else {
      this.logger.warn(
        'TELEGRAM_BOT_TOKEN is not defined. Telegram bot will not start.',
      );
    }
  }

  onModuleInit() {
    if (!this.bot) return;

    this.bot.on('message', async (ctx) => {
      try {
        const message = ctx.message as any;

        let rawText = '';
        let referenceImageUrl: string | undefined = undefined;

        if (message.text && message.text.startsWith('/createpost')) {
          rawText = message.text;
        } else if (
          message.caption &&
          message.caption.startsWith('/createpost')
        ) {
          rawText = message.caption;

          if (message.photo && message.photo.length > 0) {
            // Get the highest resolution photo (last in the array)
            const photoId = message.photo[message.photo.length - 1].file_id;
            const fileLink = await ctx.telegram.getFileLink(photoId);
            referenceImageUrl = fileLink.toString();
          }
        } else {
          // Not a createpost command, ignore
          return;
        }

        const chatId = ctx.from.id.toString();

        await this.processCommandUseCase.execute(
          chatId,
          rawText,
          referenceImageUrl,
        );

        const replyMsg = referenceImageUrl
          ? '✅ Comando /createpost recibido con imagen de referencia.\nEl Agente Creador está redactando el contenido y clonando el estilo visual...'
          : '✅ Comando /createpost recibido.\nEl Agente Creador está redactando el contenido...';

        await ctx.reply(replyMsg);
      } catch (error) {
        this.logger.error(`Error processing command: ${error.message}`);
        // Only reply if this is from an authorized user, otherwise ignore it
        if (error.message !== 'Unauthorized chat ID') {
          void ctx.reply(`❌ Ha ocurrido un error: ${error.message}`);
        }
      }
    });

    // Start listening
    this.bot.launch();
    this.logger.log('Telegram Bot Polling started');

    // Enable graceful stop
    process.once('SIGINT', () => this.bot.stop('SIGINT'));
    process.once('SIGTERM', () => this.bot.stop('SIGTERM'));
  }
}
