import { Promise } from 'core/promise';

export interface ModelManager<T> {
    save(data: object):  Promise<T>;
    delete(id: number): Promise<T>;
    fetch(): Promise<Array<T>>;
}