import { makeAnswer } from 'test/factories/make-answer';
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';

import { GetAnswerByIdUseCase } from './get-answer-by-id';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: GetAnswerByIdUseCase;

describe('Get Answer By Id', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new GetAnswerByIdUseCase(inMemoryAnswersRepository);
  });

  it('should be able to get a answer by id', async () => {
    const newAnswer = makeAnswer();

    await inMemoryAnswersRepository.create(newAnswer);

    const { answer } = await sut.execute({
      answerId: newAnswer.id.toValue(),
    });

    expect(answer.id).toBeTruthy();
    expect(answer.id).toEqual(newAnswer.id);
    expect(answer.content).toEqual(newAnswer.content);
  });

  it('should not be able to get a non-existent answer', async () => {
    expect(() =>
      sut.execute({
        answerId: 'non-existent-answer-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
