import { GenericReadOnlyCollection } from './genericReadOnlyCollection';

export interface GenericCollection<T> extends GenericReadOnlyCollection<T>  {
    set(name: string, value: T): void;
}
