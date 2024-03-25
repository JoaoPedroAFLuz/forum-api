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

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment);
  }
}
