import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { GetAnswerCommentByIdUseCase } from './get-answer-comment-by-id';

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

interface DeleteAnswerCommentUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(
    private answersCommentsRepository: AnswerCommentsRepository,
    private getAnswerCommentById: GetAnswerCommentByIdUseCase,
  ) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteAnswerCommentUseCaseRequest): Promise<DeleteAnswerCommentUseCaseResponse> {
    const { answerComment } = await this.getAnswerCommentById.execute({
      answerCommentId,
    });

    if (answerComment.authorId.toString() !== authorId) {
      throw new Error('Not allowed.');
    }

    await this.answersCommentsRepository.delete(answerComment);

    return {};
  }
}
