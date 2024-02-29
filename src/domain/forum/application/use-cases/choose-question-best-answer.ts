import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';
import { GetAnswerByIdUseCase } from './get-answer-by-id';
import { GetQuestionByIdUseCase } from './get-question-by-id';

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private getQuestionByIdUseCase: GetQuestionByIdUseCase,
    private getAnswerByIdUseCase: GetAnswerByIdUseCase,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const { answer } = await this.getAnswerByIdUseCase.execute({
      answerId,
    });

    const { question } = await this.getQuestionByIdUseCase.execute({
      questionId: answer.questionId.toString(),
    });

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not allowed.');
    }

    question.bestAnswerId = answer.id;

    await this.questionsRepository.save(question);

    return { question };
  }
}
