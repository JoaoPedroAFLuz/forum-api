import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { FetchQuestionCommentsUseCase } from './fetch-question-comments';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: FetchQuestionCommentsUseCase;

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();

    sut = new FetchQuestionCommentsUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to fetch question comments', async () => {
    const questionComment1 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      createdAt: new Date(2024, 0, 1),
    });

    const questionComment2 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      createdAt: new Date(2024, 0, 2),
    });

    const questionComment3 = makeQuestionComment({
      questionId: new UniqueEntityId('question-1'),
      createdAt: new Date(2024, 0, 3),
    });

    await inMemoryQuestionCommentsRepository.create(questionComment1);
    await inMemoryQuestionCommentsRepository.create(questionComment2);
    await inMemoryQuestionCommentsRepository.create(questionComment3);

    console.log(
      '🚀 ~ inMemoryQuestionCommentsRepository:',
      inMemoryQuestionCommentsRepository.items,
    );

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(questionComments).toHaveLength(3);
    expect(questionComments).toEqual([
      questionComment3,
      questionComment2,
      questionComment1,
    ]);
  });

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentsRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
          createdAt: new Date(2024, 0, i),
        }),
      );
    }

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    });

    expect(questionComments).toHaveLength(2);
    expect(questionComments).toEqual([
      expect.objectContaining({ createdAt: new Date(2024, 0, 2) }),
      expect.objectContaining({ createdAt: new Date(2024, 0, 1) }),
    ]);
  });
});
