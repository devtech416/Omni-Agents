import { TelegramCommand } from './telegram-command';

describe('TelegramCommand (Value Object)', () => {
  it('should create a valid command and payload from raw text', () => {
    const rawText = '/createpost Beneficios de la Inteligencia Artificial';
    const command = new TelegramCommand(rawText);

    expect(command.getCommand()).toBe('/createpost');
    expect(command.getPayload()).toBe('Beneficios de la Inteligencia Artificial');
  });

  it('should handle commands without payload', () => {
    const rawText = '/status';
    const command = new TelegramCommand(rawText);

    expect(command.getCommand()).toBe('/status');
    expect(command.getPayload()).toBe('');
  });

  it('should return empty command and payload for non-command text', () => {
    const rawText = 'Hola esto es un mensaje normal';
    const command = new TelegramCommand(rawText);

    expect(command.getCommand()).toBe('');
    expect(command.getPayload()).toBe('Hola esto es un mensaje normal');
  });

  it('should handle multiple spaces correctly', () => {
    const rawText = '/createpost    Muchos espacios   ';
    const command = new TelegramCommand(rawText);

    expect(command.getCommand()).toBe('/createpost');
    expect(command.getPayload()).toBe('   Muchos espacios   ');
  });
});
