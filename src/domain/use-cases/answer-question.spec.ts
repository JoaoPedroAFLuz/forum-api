import { expect, test } from 'vitest';

import { AnswerQuestion } from './answer-question';

test('create an answer', () => {
  const answerQuestion = new AnswerQuestion();

  const { answer } = answerQuestion.execute({
    studentId: 'student-1',
    questionId: 'question-1',
    content: 'content',
  });

  expect(answer.content).toEqual('content');
});
