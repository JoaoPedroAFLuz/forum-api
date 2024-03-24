import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { DeleteQuestionCommentUseCase } from './delete-question-comment';
import { GetQuestionCommentByIdUseCase } from './get-question-comment-by-id';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let getQuestionCommentById: GetQuestionCommentByIdUseCase;
let sut: DeleteQuestionCommentUseCase;

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    getQuestionCommentById = new GetQuestionCommentByIdUseCase(
      inMemoryQuestionCommentsRepository,
    );

    sut = new DeleteQuestionCommentUseCase(
      inMemoryQuestionCommentsRepository,
      getQuestionCommentById,
    );
  });

  it('should be able to delete a question comment', async () => {
    const newQuestionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(newQuestionComment);

    await sut.execute({
      questionCommentId: newQuestionComment.id.toString(),
      authorId: newQuestionComment.authorId.toString(),
    });

    expect(inMemoryQuestionCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user question comment', async () => {
    const newQuestionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(newQuestionComment);

    expect(() =>
      sut.execute({
        questionCommentId: newQuestionComment.id.toString(),
        authorId: 'another-user-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to delete a non existing question comment', async () => {
    expect(
      sut.execute({
        questionCommentId: 'non-existent-question-comment-id',
        authorId: 'author-1',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
