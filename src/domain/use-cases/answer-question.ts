import { UniqueEntityId } from '../core/entities/unique-entity-id';
import { Answer } from '../entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface AnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

interface AnswerQuestionResponse {
  answer: Answer;
}

export class AnswerQuestion {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    });

    await this.answersRepository.create(answer);

    return { answer };
  }
}
