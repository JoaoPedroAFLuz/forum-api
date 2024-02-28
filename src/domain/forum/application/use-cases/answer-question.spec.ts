import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository';
import { AnswerQuestion } from './answer-question';

let inMemoryAnswersRepository: InMemoryAnswersRepository;
let sut: AnswerQuestion;

describe('Create a Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository();
    sut = new AnswerQuestion(inMemoryAnswersRepository);
  });

  it('should be able to create a answer', async () => {
    const { answer } = await sut.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Conteúdo da resposta',
    });

    expect(answer.id).toBeTruthy();
    expect(answer.content).toEqual('Conteúdo da resposta');
    expect(inMemoryAnswersRepository.items[0]).toEqual(answer);
  });
});
