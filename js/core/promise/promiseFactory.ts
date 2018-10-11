import { Promise } from './promise';
import { ServiceFactory, singleton } from 'lib/di';
import { PromiseCallback } from './promiseCallback';

@singleton()
export class PromiseFactory extends ServiceFactory {
    constructor() {
        super(Promise)
    }

    create<T>(callback: PromiseCallback<T>): Promise<T> {
        return super.create(callback);
    }
}