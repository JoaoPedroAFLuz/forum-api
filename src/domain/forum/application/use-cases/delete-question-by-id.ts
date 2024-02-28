import { QuestionsRepository } from '../repositories/questions-repository';
import { GetQuestionByIdUseCase } from './get-question-by-id';

interface DeleteQuestionByIdUseCaseRequest {
  authorId: string;
  questionId: string;
}

interface DeleteQuestionByIdUseCaseResponse {}

export class DeleteQuestionByIdUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private getQuestionByIdUseCase: GetQuestionByIdUseCase,
  ) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionByIdUseCaseRequest): Promise<DeleteQuestionByIdUseCaseResponse> {
    const { question } = await this.getQuestionByIdUseCase.execute({
      questionId,
    });

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    await this.questionsRepository.delete(question);

    return {};
  }
}
