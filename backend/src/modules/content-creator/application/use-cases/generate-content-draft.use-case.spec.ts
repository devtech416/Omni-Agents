import { GenerateContentDraftUseCase } from './generate-content-draft.use-case';
import { AiGeneratorPort } from '../../domain/ports/ai-generator.port';
import { ImageGeneratorPort } from '../../domain/ports/image-generator.port';
import { ContentDraftRepository } from '../../domain/ports/content-draft.repository';

describe('GenerateContentDraftUseCase', () => {
  let useCase: GenerateContentDraftUseCase;
  /* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
  let mockAiGenerator: any;
  let mockImageGenerator: any;
  let mockRepository: any;

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
      saveDraft: jest.fn().mockImplementation((draft: any) =>
        Promise.resolve({
          id: '123',
          ...draft,
        }),
      ),
    };

    useCase = new GenerateContentDraftUseCase(
      mockAiGenerator as unknown as AiGeneratorPort,
      mockImageGenerator as unknown as ImageGeneratorPort,
      mockRepository as unknown as ContentDraftRepository,
    );
  });

  it('should generate content using AI and save it as a draft', async () => {
    const topic = 'IA en clínicas de estética';

    const result = await useCase.execute(topic);

    expect(mockAiGenerator.generatePostContent).toHaveBeenCalledWith(
      topic,
      undefined,
    );
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
