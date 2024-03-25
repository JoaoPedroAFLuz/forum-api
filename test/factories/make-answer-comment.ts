import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  AnswerComment,
  AnswerCommentProps,
} from '@/domain/forum/enterprise/entities/answer-comment';
import { faker } from '@faker-js/faker';

export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  return AnswerComment.create(
    {
      answerId: new UniqueEntityId('answer-1'),
      authorId: new UniqueEntityId('author-1'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );
}
