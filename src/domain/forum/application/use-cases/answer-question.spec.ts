import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

import { AnswerQuestionUseCase } from './answer-question';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestionUseCase;

describe('Create a Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository);
  });

  it('should be able to create a answer', async () => {
    const { answer } = await sut.execute({
      instructorId: 'instructor-1',
      questionId: 'question-1',
      content: 'Answer content',
    });

    expect(answer.id).toBeTruthy();
    expect(answer.content).toEqual('Answer content');
    expect(inMemoryAnswersRepository.items[0]).toEqual(answer);
  });
});
