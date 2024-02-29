import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { FetchQuestionAnswersUseCase } from './fetch-question-answers';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: FetchQuestionAnswersUseCase;

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository);
  });

  it('should be able to fetch question answers', async () => {
    const question = makeQuestion();
    await inMemoryQuestionsRepository.create(makeQuestion());

    const answer1 = makeAnswer({
      questionId: question.id,
      createdAt: new Date(2024, 0, 1),
    });
    const answer2 = makeAnswer({
      questionId: question.id,
      createdAt: new Date(2024, 0, 2),
    });
    const answer3 = makeAnswer({
      questionId: question.id,
      createdAt: new Date(2024, 0, 3),
    });

    await inMemoryAnswersRepository.create(answer1);
    await inMemoryAnswersRepository.create(answer2);
    await inMemoryAnswersRepository.create(answer3);

    const { answers } = await sut.execute({
      questionId: question.id.toString(),
      page: 1,
    });

    expect(answers).toHaveLength(3);
    expect(answers).toEqual([answer3, answer2, answer1]);
  });

  it('should be able to fetch paginated question answers', async () => {
    const question = makeQuestion();
    await inMemoryQuestionsRepository.create(makeQuestion());

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({
          questionId: question.id,
          createdAt: new Date(2024, 0, i),
        }),
      );
    }

    const { answers } = await sut.execute({
      questionId: question.id.toString(),
      page: 2,
    });

    expect(answers).toHaveLength(2);
    expect(answers).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 2) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 1) }),
    ]);
  });
});
