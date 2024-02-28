import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { EditQuestionUseCase } from './edit-question';
import { GetQuestionByIdUseCase } from './get-question-by-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let getQuestionByIdUseCase: GetQuestionByIdUseCase;
let sut: EditQuestionUseCase;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    getQuestionByIdUseCase = new GetQuestionByIdUseCase(
      inMemoryQuestionsRepository,
    );
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      getQuestionByIdUseCase,
    );
  });

  it('should be able to edit a question', async () => {
    const authorId = 'author-1';
    const questionId = 'question-1';
    const newTitle = 'New Title';
    const newContent = 'New Content';

    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntityId(authorId),
        title: 'Some title',
        content: 'Some content',
      },
      new UniqueEntityId(questionId),
    );

    await inMemoryQuestionsRepository.create(newQuestion);

    const { question } = await sut.execute({
      questionId,
      authorId,
      title: newTitle,
      content: newContent,
    });

    expect(question).toMatchObject({
      _id: new UniqueEntityId(questionId),
      title: newTitle,
      content: newContent,
    });
  });

  it('should not be able to edit another user question', async () => {
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
        title: 'New title',
        content: 'New content',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to edit a non-existent question', async () => {
    expect(() =>
      sut.execute({
        authorId: 'author-1',
        questionId: 'non-existent-question-id',
        title: 'New title',
        content: 'New content',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
