import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: FetchAnswerCommentsUseCase;

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to fetch answer comments', async () => {
    const answerComment1 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      createdAt: new Date(2024, 0, 1),
    });

    const answerComment2 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      createdAt: new Date(2024, 0, 2),
    });

    const answerComment3 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      createdAt: new Date(2024, 0, 3),
    });

    await inMemoryAnswerCommentsRepository.create(answerComment1);
    await inMemoryAnswerCommentsRepository.create(answerComment2);
    await inMemoryAnswerCommentsRepository.create(answerComment3);

    console.log(
      '🚀 ~ inMemoryAnswerCommentsRepository:',
      inMemoryAnswerCommentsRepository.items,
    );

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    });

    expect(answerComments).toHaveLength(3);
    expect(answerComments).toEqual([
      answerComment3,
      answerComment2,
      answerComment1,
    ]);
  });

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
          createdAt: new Date(2024, 0, i),
        }),
      );
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    });

    expect(answerComments).toHaveLength(2);
    expect(answerComments).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 2) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 1) }),
    ]);
  });
});
