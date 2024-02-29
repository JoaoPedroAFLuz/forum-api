import { makeQuestion } from 'test/factories/make-question';
import { InMemoryQuestionCommentCommentsRepository } from 'test/repositories/in-memory-question-comments-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';
import { CommentOnQuestionUseCase } from './comment-on-question';
import { GetQuestionByIdUseCase } from './get-question-by-id';

let inMemoryCommentOnQuestionRepository: InMemoryQuestionCommentCommentsRepository;
let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let getQuestionByIdUeCase: GetQuestionByIdUseCase;
let sut: CommentOnQuestionUseCase;

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryCommentOnQuestionRepository =
      new InMemoryQuestionCommentCommentsRepository();

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    getQuestionByIdUeCase = new GetQuestionByIdUseCase(
      inMemoryQuestionsRepository,
    );

    sut = new CommentOnQuestionUseCase(
      inMemoryCommentOnQuestionRepository,
      getQuestionByIdUeCase,
    );
  });

  it('should be able to comment on question', async () => {
    const newQuestion = makeQuestion();
    inMemoryQuestionsRepository.create(newQuestion);

    const { questionComment } = await sut.execute({
      questionId: newQuestion.id.toString(),
      authorId: 'author-1',
      content: 'Comment content',
    });

    expect(questionComment.id).toBeTruthy();
    expect(questionComment.content).toEqual('Comment content');
    expect(inMemoryCommentOnQuestionRepository.items).toHaveLength(1);
    expect(inMemoryCommentOnQuestionRepository.items[0]).toEqual(
      questionComment,
    );
  });

  it('should not be able to comment on a non-existent question', async () => {
    expect(() =>
      sut.execute({
        questionId: 'non-existent-question-id',
        authorId: 'author-1',
        content: 'Comment content',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
