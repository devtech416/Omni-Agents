/* eslint-disable @typescript-eslint/unbound-method */
import { GenerateContentDraftUseCase } from './generate-content-draft.use-case';
import { AiGeneratorPort } from '../../domain/ports/ai-generator.port';
import { ImageGeneratorPort } from '../../domain/ports/image-generator.port';
import { ContentDraftRepository } from '../../domain/ports/content-draft.repository';

describe('GenerateContentDraftUseCase', () => {
  let useCase: GenerateContentDraftUseCase;
  let mockAiGenerator: jest.Mocked<AiGeneratorPort>;
  let mockImageGenerator: jest.Mocked<ImageGeneratorPort>;
  let mockRepository: jest.Mocked<ContentDraftRepository>;

  beforeEach(() => {
    mockAiGenerator = {
      generatePostContent: jest.fn().mockResolvedValue({
        content: 'Este es un post generado por IA',
        imagePrompt: 'A futuristic clinic with AI doctors',
      }),
    };

    mockImageGenerator = {
      generateImage: jest
        .fn()
        .mockResolvedValue('https://fake-dalle-url.com/image.png'),
    };

    mockRepository = {
      saveDraft: jest.fn().mockImplementation((draft) =>
        Promise.resolve({
          id: '123',
          ...draft,
        }),
      ),
    };

    useCase = new GenerateContentDraftUseCase(
      mockAiGenerator,
      mockImageGenerator,
      mockRepository,
    );
  });

  it('should generate content using AI and save it as a draft', async () => {
    const topic = 'IA en clínicas de estética';

    const result = await useCase.execute(topic);

    expect(mockAiGenerator.generatePostContent).toHaveBeenCalledWith(topic);
    expect(mockImageGenerator.generateImage).toHaveBeenCalledWith(
      'A futuristic clinic with AI doctors',
    );
    expect(mockRepository.saveDraft).toHaveBeenCalledWith({
      topic,
      content: 'Este es un post generado por IA',
      prompt: 'A futuristic clinic with AI doctors',
      imageUrl: 'https://fake-dalle-url.com/image.png',
      status: 'PENDING_REVIEW',
      platform: 'INSTAGRAM',
    });

    expect(result.id).toBe('123');
    expect(result.status).toBe('PENDING_REVIEW');
  });

  it('should throw an error if text AI generation fails', async () => {
    mockAiGenerator.generatePostContent.mockRejectedValue(
      new Error('AI API Error'),
    );
    const imageSpy = jest.spyOn(mockImageGenerator, 'generateImage');
    const repoSpy = jest.spyOn(mockRepository, 'saveDraft');

    await expect(useCase.execute('Topic')).rejects.toThrow('AI API Error');
    expect(imageSpy).not.toHaveBeenCalled();
    expect(repoSpy).not.toHaveBeenCalled();
  });

  it('should throw an error if image AI generation fails', async () => {
    mockImageGenerator.generateImage.mockRejectedValue(
      new Error('DALL-E API Error'),
    );
    const repoSpy = jest.spyOn(mockRepository, 'saveDraft');

    await expect(useCase.execute('Topic')).rejects.toThrow('DALL-E API Error');
    expect(repoSpy).not.toHaveBeenCalled();
  });
});
