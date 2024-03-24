import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentsRepository } from '../repositories/question-comments-repository';

interface GetQuestionCommentByIdUseCaseRequest {
  questionCommentId: string;
}

interface GetQuestionCommentByIdUseCaseResponse {
  questionComment: QuestionComment;
}

export class GetQuestionCommentByIdUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionCommentId: commentQuestionId,
  }: GetQuestionCommentByIdUseCaseRequest): Promise<GetQuestionCommentByIdUseCaseResponse> {
    const questionComment =
      await this.questionCommentsRepository.findById(commentQuestionId);

    if (!questionComment) {
      throw new Error('Question comment not found.');
    }

    return { questionComment };
  }
}
