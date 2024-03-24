import { faker } from '@faker-js/faker';

import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment';

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId,
) {
  return QuestionComment.create(
    {
      questionId: new UniqueEntityId('question-1'),
      authorId: new UniqueEntityId('author-1'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  );
}
