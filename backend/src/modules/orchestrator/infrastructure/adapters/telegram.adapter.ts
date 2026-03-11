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
      this.logger.warn('TELEGRAM_BOT_TOKEN is not defined. Telegram bot will not start.');
    }
  }

  onModuleInit() {
    if (!this.bot) return;

    this.bot.command('createpost', async (ctx) => {
      try {
        const rawText = ctx.message.text;
        const chatId = ctx.from.id.toString();
        
        await this.processCommandUseCase.execute(chatId, rawText);
        await ctx.reply('✅ Comando /createpost recibido. El Agente Creador está redactando el contenido...');
      } catch (error) {
        this.logger.error(`Error processing command: ${error.message}`);
        // Only reply if this is from an authorized user, otherwise ignore it
        if (error.message !== 'Unauthorized chat ID') {
             await ctx.reply(`❌ Ha ocurrido un error: ${error.message}`);
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
