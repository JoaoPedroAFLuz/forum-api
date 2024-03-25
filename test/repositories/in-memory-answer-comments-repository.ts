import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = [];

  async findById(answerCommentId: string) {
    const answerComment = this.items.find(
      (item) => item.id.toString() === answerCommentId,
    );

    if (!answerComment) {
      return null;
    }

    return answerComment;
  }

  async findManyByAnswerId(questionId: string, { page }: PaginationParams) {
    return this.items
      .filter((item) => item.answerId.toString() === questionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice((page - 1) * 20, page * 20);
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }

  async delete(answerComment: AnswerComment): Promise<void> {
    this.items = this.items.filter((item) => item.id !== answerComment.id);
  }
}
