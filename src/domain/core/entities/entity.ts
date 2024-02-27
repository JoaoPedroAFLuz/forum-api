import { randomUUID } from 'node:crypto';

export class Entity<T> {
  private _id: string;
  protected props: T;

  constructor(props: any, id?: string) {
    this._id = id ?? randomUUID();
    this.props = props;
  }

  get id() {
    return this._id;
  }
}
