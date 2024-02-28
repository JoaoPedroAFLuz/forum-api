import { QuestionsRepository } from '../repositories/questions-repository';
import { GetQuestionByIdUseCase } from './get-question-by-id';

interface EditQuestionUseCaseRequest {
  questionId: string;
  authorId: string;
  title: string;
  content: string;
}

interface EditQuestionUseCaseResponse {}

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private getQuestionByIdUseCase: GetQuestionByIdUseCase,
  ) {}

  async execute({
    questionId,
    authorId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const { question } = await this.getQuestionByIdUseCase.execute({
      questionId,
    });

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    question.title = title;
    question.content = content;

    await this.questionsRepository.save(question);

    return {};
  }
}
