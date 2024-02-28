import { AnswersRepository } from '../repositories/answers-repository';
import { AnswerQuestion } from './answer-question';

const fakeAnswersRepository: AnswersRepository = {
  create: async () => {},
};

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestion(fakeAnswersRepository);

  const { answer } = await answerQuestion.execute({
    instructorId: 'student-1',
    questionId: 'question-1',
    content: 'content',
  });

  expect(answer.content).toEqual('content');
});
