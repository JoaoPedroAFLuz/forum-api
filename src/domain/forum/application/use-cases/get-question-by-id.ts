import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface GetQuestionByIdUseCaseRequest {
  questionId: string;
}

interface GetQuestionByIdUseCaseResponse {
  question: Question;
}

export class GetQuestionByIdUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    questionId,
  }: GetQuestionByIdUseCaseRequest): Promise<GetQuestionByIdUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId);

    if (!question) {
      throw new Error('Question not found.');
    }

    return { question };
  }
}
