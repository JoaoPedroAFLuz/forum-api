import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { DeleteAnswerCommentUseCase } from './delete-answer-comment';
import { GetAnswerCommentByIdUseCase } from './get-answer-comment-by-id';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let getAnswerCommentById: GetAnswerCommentByIdUseCase;
let sut: DeleteAnswerCommentUseCase;

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    getAnswerCommentById = new GetAnswerCommentByIdUseCase(
      inMemoryAnswerCommentsRepository,
    );

    sut = new DeleteAnswerCommentUseCase(
      inMemoryAnswerCommentsRepository,
      getAnswerCommentById,
    );
  });

  it('should be able to delete a answer comment', async () => {
    const newAnswerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(newAnswerComment);

    await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
      authorId: newAnswerComment.authorId.toString(),
    });

    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user answer comment', async () => {
    const newAnswerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(newAnswerComment);

    expect(() =>
      sut.execute({
        answerCommentId: newAnswerComment.id.toString(),
        authorId: 'another-user-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to delete a non existing answer comment', async () => {
    expect(
      sut.execute({
        answerCommentId: 'non-existent-answer-comment-id',
        authorId: 'author-1',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
