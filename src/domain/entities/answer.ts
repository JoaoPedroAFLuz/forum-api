import { Entity } from '../core/entities/entity';
import { UniqueEntityId } from '../core/entities/unique-entity-id';
import { Optional } from '../core/types/optional';

interface AnswerProps {
  authorId: UniqueEntityId;
  questionId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Answer extends Entity<AnswerProps> {
  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityId
  ) {
    return new Answer(
      {
        ...props,
        createdAt: new Date(),
      },
      id
    );
  }

  get authorId() {
    return this.props.authorId;
  }

  get questionId() {
    return this.props.questionId;
  }

  get content() {
    return this.props.content;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd() + '...';
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set content(content: string) {
    this.props.content = content;

    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
