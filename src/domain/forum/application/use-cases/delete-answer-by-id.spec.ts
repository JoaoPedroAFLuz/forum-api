import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { DeleteAnswerByIdUseCase } from './delete-answer-by-id';
import { GetAnswerByIdUseCase } from './get-answer-by-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let getAnswerByIdUseCase: GetAnswerByIdUseCase;
let sut: DeleteAnswerByIdUseCase;

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    getAnswerByIdUseCase = new GetAnswerByIdUseCase(inMemoryAnswersRepository);
    sut = new DeleteAnswerByIdUseCase(
      inMemoryAnswersRepository,
      getAnswerByIdUseCase,
    );
  });

  it('should be able to delete a answer', async () => {
    const authorId = 'author-1';
    const answerId = 'answer-1';

    const answerOne = makeAnswer(
      {
        authorId: new UniqueEntityId(authorId),
      },
      new UniqueEntityId(answerId),
    );

    await inMemoryAnswersRepository.create(answerOne);

    await sut.execute({
      authorId,
      answerId,
    });

    expect(inMemoryAnswersRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user answer', async () => {
    const answerId = 'answer-1';

    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId(answerId),
    );

    await inMemoryAnswersRepository.create(answer);

    expect(() =>
      sut.execute({
        authorId: 'author-2',
        answerId: answerId,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to delete a non-existent answer', async () => {
    expect(() =>
      sut.execute({
        authorId: 'author-1',
        answerId: 'non-existent-answer-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
