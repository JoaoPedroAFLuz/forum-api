import { UniqueEntityId } from './unique-entity-id';

export class Entity<T> {
  private _id: UniqueEntityId;
  protected props: T;

  constructor(props: any, id?: string) {
    this._id = new UniqueEntityId(id);
    this.props = props;
  }

  get id() {
    return this._id;
  }
}
