import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  return Question.create({
    authorId: new UniqueEntityId('1'),
    title: 'Example title',
    slug: Slug.create('example-slug'),
    content: 'Example content',
    ...override,
  });
}
