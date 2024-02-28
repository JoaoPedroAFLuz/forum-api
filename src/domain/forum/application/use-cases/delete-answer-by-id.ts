import { AnswersRepository } from '../repositories/answers-repository';
import { GetAnswerByIdUseCase } from './get-answer-by-id';

interface DeleteAnswerByIdUseCaseRequest {
  authorId: string;
  answerId: string;
}

interface DeleteAnswerByIdUseCaseResponse {}

export class DeleteAnswerByIdUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private getAnswerByIdUseCase: GetAnswerByIdUseCase,
  ) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerByIdUseCaseRequest): Promise<DeleteAnswerByIdUseCaseResponse> {
    const { answer } = await this.getAnswerByIdUseCase.execute({
      answerId,
    });

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    await this.answersRepository.delete(answer);

    return {};
  }
}
