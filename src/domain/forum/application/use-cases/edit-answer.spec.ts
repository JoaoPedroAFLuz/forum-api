import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { EditAnswerUseCase } from './edit-answer';
import { GetAnswerByIdUseCase } from './get-answer-by-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let getAnswerByIdUseCase: GetAnswerByIdUseCase;
let sut: EditAnswerUseCase;

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    getAnswerByIdUseCase = new GetAnswerByIdUseCase(inMemoryAnswersRepository);
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      getAnswerByIdUseCase,
    );
  });

  it('should be able to edit a answer', async () => {
    const authorId = 'author-1';
    const answerId = 'answer-1';

    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntityId(authorId),
        content: 'Some content',
      },
      new UniqueEntityId(answerId),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    await sut.execute({
      answerId,
      authorId,
      content: 'New content',
    });

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      _id: new UniqueEntityId(answerId),
      title: 'New title',
      content: 'New content',
    });
  });

  it('should not be able to edit another user answer', async () => {
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
        content: 'New content',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to edit a non-existent answer', async () => {
    expect(() =>
      sut.execute({
        authorId: 'author-1',
        answerId: 'non-existent-answer-id',
        content: 'New content',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
