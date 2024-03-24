import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository';
import { GetAnswerByIdUseCase } from './get-answer-by-id';

interface CommentOnAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface CommentOnAnswerUseCaseResponse {
  answerComment: AnswerComment;
}

export class CommentOnAnswerUseCase {
  constructor(
    private answerCommentsRepository: AnswerCommentsRepository,
    private getAnswerByIdUseCase: GetAnswerByIdUseCase,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    await this.getAnswerByIdUseCase.execute({ answerId });

    const answerComment = AnswerComment.create({
      answerId: new UniqueEntityId(answerId),
      authorId: new UniqueEntityId(authorId),
      content,
    });

    await this.answerCommentsRepository.create(answerComment);

    return { answerComment };
  }
}
