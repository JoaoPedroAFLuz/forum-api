import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';

interface GetAnswerCommentUseCaseRequest {
  answerCommentId: string;
}

interface GetAnswerCommentUseCaseResponse {
  answerComment: AnswerComment;
}

export class GetAnswerCommentByIdUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerCommentId,
  }: GetAnswerCommentUseCaseRequest): Promise<GetAnswerCommentUseCaseResponse> {
    const answerComment =
      await this.answerCommentsRepository.findById(answerCommentId);

    if (!answerComment) {
      throw new Error('Answer comment not found');
    }

    return { answerComment };
  }
}
