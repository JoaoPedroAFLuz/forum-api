import { Answer } from '../entities/answer';

interface AnswerQuestionRequest {
  studentId: string;
  questionId: string;
  content: string;
}

interface AnswerQuestionResponse {
  answer: Answer;
}

export class AnswerQuestion {
  constructor() {}

  execute({
    studentId,
    questionId,
    content,
  }: AnswerQuestionRequest): AnswerQuestionResponse {
    const answer = new Answer(content);

    return { answer };
  }
}
