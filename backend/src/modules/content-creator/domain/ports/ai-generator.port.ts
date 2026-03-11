export interface AiGeneratedContent {
  content: string;
  imagePrompt: string;
}

export const AI_GENERATOR_PORT = Symbol('AI_GENERATOR_PORT');

export interface AiGeneratorPort {
  generatePostContent(topic: string): Promise<AiGeneratedContent>;
}
