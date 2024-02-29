import { makeAnswer } from 'test/factories/make-answer';
import { makeQuestion } from 'test/factories/make-question';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer';
import { GetAnswerByIdUseCase } from './get-answer-by-id';
import { GetQuestionByIdUseCase } from './get-question-by-id';

let inMemoryQuestionsRepository: InMemoryQuestionsRepository;
let inMemoryAnswersRepository: InMemoryAnswersRepository;
let getQuestionByIdUseCase: GetQuestionByIdUseCase;
let getAnswerByIdUseCase: GetAnswerByIdUseCase;
let sut: ChooseQuestionBestAnswerUseCase;

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository();
    getQuestionByIdUseCase = new GetQuestionByIdUseCase(
      inMemoryQuestionsRepository,
    );

    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    getAnswerByIdUseCase = new GetAnswerByIdUseCase(inMemoryAnswersRepository);

    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      getQuestionByIdUseCase,
      getAnswerByIdUseCase,
    );
  });

  it('should be able to choose question best answer', async () => {
    const answerId = 'answer-1';
    const authorId = 'author-1';

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId(authorId),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const newAnswer = makeAnswer(
      {
        questionId: newQuestion.id,
      },
      new UniqueEntityId(answerId),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    const { question } = await sut.execute({
      answerId,
      authorId,
    });

    expect(question).toMatchObject({
      bestAnswerId: new UniqueEntityId(answerId),
    });
  });

  it('should not be able to choose another user question best answer', async () => {
    const answerId = 'answer-1';

    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    });

    await inMemoryQuestionsRepository.create(newQuestion);

    const newAnswer = makeAnswer(
      {
        questionId: newQuestion.id,
      },
      new UniqueEntityId(answerId),
    );

    await inMemoryAnswersRepository.create(newAnswer);

    expect(() =>
      sut.execute({
        answerId,
        authorId: 'author-2',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
