import dayjs from 'dayjs';

import { Entity } from '@/core/entities/entity';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { Optional } from '@/core/types/optional';

export interface AnswerCommentProps {
  answerId: UniqueEntityId;
  authorId: UniqueEntityId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class AnswerComment extends Entity<AnswerCommentProps> {
  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    return new AnswerComment(
      {
        createdAt: new Date(),
        ...props,
      },
      id,
    );
  }

  get answerId() {
    return this.props.answerId;
  }

  get authorId() {
    return this.props.authorId;
  }

  get content() {
    return this.props.content;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get isNew(): boolean {
    return dayjs().diff(this.createdAt, 'days') <= 3;
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
