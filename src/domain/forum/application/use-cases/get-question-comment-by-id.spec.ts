import { makeQuestionComment } from 'test/factories/make-question-comment';
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { GetQuestionCommentByIdUseCase } from './get-question-comment-by-id';

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository;
let sut: GetQuestionCommentByIdUseCase;

describe('Get Question Comment By Id', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository();
    sut = new GetQuestionCommentByIdUseCase(inMemoryQuestionCommentsRepository);
  });

  it('should be able to get question comment by id', async () => {
    const newQuestionComment = makeQuestionComment();

    await inMemoryQuestionCommentsRepository.create(newQuestionComment);

    const { questionComment } = await sut.execute({
      questionCommentId: newQuestionComment.id.toString(),
    });

    expect(questionComment.id).toBeTruthy();
    expect(questionComment.id).toEqual(newQuestionComment.id);
  });

  it('should not be able to get a non existing question comment', async () => {
    expect(() =>
      sut.execute({
        questionCommentId: 'non-existent-question-comment-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
