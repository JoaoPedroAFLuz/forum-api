import { AnswersRepository } from '../repositories/answers-repository';
import { GetAnswerByIdUseCase } from './get-answer-by-id';

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {}

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private getAnswerByIdUseCase: GetAnswerByIdUseCase,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const { answer } = await this.getAnswerByIdUseCase.execute({
      answerId,
    });

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    answer.content = content;

    await this.answersRepository.save(answer);

    return {};
  }
}
