import { makeAnswerComment } from 'test/factories/make-answer-comment';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { GetAnswerCommentByIdUseCase } from './get-answer-comment-by-id';

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: GetAnswerCommentByIdUseCase;

describe('Get Answer Comment By Id', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();
    sut = new GetAnswerCommentByIdUseCase(inMemoryAnswerCommentsRepository);
  });

  it('should be able to get answer comment by id', async () => {
    const newAnswerComment = makeAnswerComment();

    await inMemoryAnswerCommentsRepository.create(newAnswerComment);

    const { answerComment } = await sut.execute({
      answerCommentId: newAnswerComment.id.toString(),
    });

    expect(answerComment.id).toBeTruthy();
    expect(answerComment.id).toEqual(newAnswerComment.id);
  });

  it('should not be able to get a non existing answer comment', async () => {
    expect(() =>
      sut.execute({
        answerCommentId: 'non-existent-answer-comment-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
