import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { DeleteQuestionByIdUseCase } from './delete-question-by-id';
import { GetQuestionByIdUseCase } from './get-question-by-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let getQuestionByIdUseCase: GetQuestionByIdUseCase;
let sut: DeleteQuestionByIdUseCase;

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    getQuestionByIdUseCase = new GetQuestionByIdUseCase(
      inMemoryQuestionsRepository,
    );
    sut = new DeleteQuestionByIdUseCase(
      inMemoryQuestionsRepository,
      getQuestionByIdUseCase,
    );
  });

  it('should be able to delete a question', async () => {
    const authorId = 'author-1';
    const questionId = 'question-1';

    const question = makeQuestion(
      {
        authorId: new UniqueEntityId(authorId),
      },
      new UniqueEntityId(questionId),
    );

    await inMemoryQuestionsRepository.create(question);

    await sut.execute({
      authorId,
      questionId,
    });

    expect(inMemoryQuestionsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user question', async () => {
    const questionId = 'question-1';

    const question = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId(questionId),
    );

    await inMemoryQuestionsRepository.create(question);

    expect(() =>
      sut.execute({
        authorId: 'author-2',
        questionId: questionId,
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to delete a non-existent question', async () => {
    expect(() =>
      sut.execute({
        authorId: 'author-1',
        questionId: 'non-existent-question-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
