export const IMAGE_GENERATOR_PORT = Symbol('IMAGE_GENERATOR_PORT');

export interface ImageGeneratorPort {
  generateImage(prompt: string): Promise<string>;
}
