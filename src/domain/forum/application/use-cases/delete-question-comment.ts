import { QuestionCommentsRepository } from '../repositories/question-comments-repository';
import { GetQuestionCommentByIdUseCase } from './get-question-comment-by-id';

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

interface DeleteQuestionCommentUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionsCommentsRepository: QuestionCommentsRepository,
    private getQuestionCommentById: GetQuestionCommentByIdUseCase,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteQuestionCommentUseCaseRequest): Promise<DeleteQuestionCommentUseCaseResponse> {
    const { questionComment } = await this.getQuestionCommentById.execute({
      questionCommentId,
    });

    if (questionComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.');
    }

    await this.questionsCommentsRepository.delete(questionComment);

    return {};
  }
}
