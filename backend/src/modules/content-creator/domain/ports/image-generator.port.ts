export const OPENAI_GENERATOR_PORT = Symbol('OPENAI_GENERATOR_PORT');
export const CANVA_GENERATOR_PORT = Symbol('CANVA_GENERATOR_PORT');

export interface ImageGeneratorPort {
  generateImage(prompt: string): Promise<string>;
}
