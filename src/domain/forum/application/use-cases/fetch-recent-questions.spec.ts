import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

import { FetchRecentQuestionsUseCase } from './fetch-recent-questions';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let sut: FetchRecentQuestionsUseCase;

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    sut = new FetchRecentQuestionsUseCase(inMemoryQuestionsRepository);
  });

  it('should be able to fetch questions', async () => {
    const question1 = makeQuestion({
      createdAt: new Date(2024, 0, 1),
    });
    const question2 = makeQuestion({
      createdAt: new Date(2024, 0, 2),
    });
    const question3 = makeQuestion({
      createdAt: new Date(2024, 0, 3),
    });

    await inMemoryQuestionsRepository.create(question1);
    await inMemoryQuestionsRepository.create(question2);
    await inMemoryQuestionsRepository.create(question3);

    const { questions } = await sut.execute({
      page: 1,
    });

    expect(questions).toHaveLength(3);
    expect(questions).toEqual([question3, question2, question1]);
  });

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionsRepository.create(
        makeQuestion({
          createdAt: new Date(2024, 0, i),
        }),
      );
    }

    const { questions } = await sut.execute({
      page: 2,
    });

    expect(questions).toHaveLength(2);
    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 2) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 1) }),
    ]);
  });
});
