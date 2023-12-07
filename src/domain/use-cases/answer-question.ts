import { Answer } from '../entities/answer';

interface AnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

interface AnswerQuestionResponse {
  answer: Answer;
}

export class AnswerQuestion {
  constructor() {}

  execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionRequest): AnswerQuestionResponse {
    const answer = new Answer({ content, authorId: instructorId, questionId });

    return { answer };
  }
}
