import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface GetAnswerByIdUseCaseRequest {
  answerId: string;
}

interface GetAnswerByIdUseCaseResponse {
  answer: Answer;
}

export class GetAnswerByIdUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    answerId,
  }: GetAnswerByIdUseCaseRequest): Promise<GetAnswerByIdUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found.');
    }

    return { answer };
  }
}
