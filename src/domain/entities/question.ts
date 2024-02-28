import dayjs from 'dayjs';

import { Entity } from '../core/entities/entity';
import { UniqueEntityId } from '../core/entities/unique-entity-id';
import { Optional } from '../core/types/optional';
import { Slug } from './value-objects/slug';

interface QuestionProps {
  authorId: UniqueEntityId;
  bestAnswerId?: UniqueEntityId;
  title: string;
  content: string;
  slug: Slug;
  createdAt: Date;
  updatedAt?: Date;
}

export class Question extends Entity<QuestionProps> {
  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId
  ) {
    return new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFormText(props.title),
        createdAt: new Date(),
      },
      id
    );
  }

  get authorId() {
    return this.props.authorId;
  }

  get bestAnswerId() {
    return this.props.bestAnswerId;
  }

  get title() {
    return this.props.title;
  }

  get content() {
    return this.props.content;
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd() + '...';
  }

  get slug() {
    return this.props.slug;
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

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    this.props.bestAnswerId = bestAnswerId;

    this.touch();
  }

  set title(title: string) {
    this.props.title = title;
    this.props.slug = Slug.createFormText(title);

    this.touch();
  }

  set content(content: string) {
    this.props.content = content;

    this.touch();
  }

  private touch() {
    this.props.updatedAt = new Date();
  }
}
