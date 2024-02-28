import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { GetQuestionByIdUseCase } from './get-question-by-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: GetQuestionByIdUseCase;

describe('Get Question By Id', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new GetQuestionByIdUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to get a question by id', async () => {
    const newQuestion = makeQuestion();

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      questionId: newQuestion.id.toValue(),
    });

    expect(question.id).toBeTruthy();
    expect(question.id).toEqual(newQuestion.id);
    expect(question.title).toEqual(newQuestion.title);
    expect(question.content).toEqual(newQuestion.content);
  });

  it('should not be able to get a non-existent question by id', async () => {
    await expect(() =>
      sut.execute({
        questionId: 'non-existent-question-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
