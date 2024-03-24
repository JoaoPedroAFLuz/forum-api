import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments-repository';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { CommentOnAnswerUseCase } from './comment-on-answer';
import { GetAnswerByIdUseCase } from './get-answer-by-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let getAnswerByIdUseCase: GetAnswerByIdUseCase;
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository;
let sut: CommentOnAnswerUseCase;

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository();

    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    getAnswerByIdUseCase = new GetAnswerByIdUseCase(inMemoryAnswersRepository);

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswerCommentsRepository,
      getAnswerByIdUseCase,
    );
  });

  it('should be able to comment on an answer', async () => {
    const answer = makeAnswer();
    inMemoryAnswersRepository.create(answer);

    const { answerComment } = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-1',
      content: 'Answer content',
    });

    expect(answerComment.id).toBeTruthy();
    expect(answerComment.content).toEqual('Answer content');
    expect(inMemoryAnswerCommentsRepository.items).toHaveLength(1);
    expect(inMemoryAnswerCommentsRepository.items[0]).toEqual(answerComment);
  });

  it('should not be able to comment on a non existing answer', async () => {
    expect(
      sut.execute({
        answerId: 'non-existent-answer-id',
        authorId: 'author-1',
        content: 'Answer content',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
