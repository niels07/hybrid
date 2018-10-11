import { singleton, inject } from 'lib/di';
import { PromiseFactory, Promise } from 'core/promise';

declare function require(
    moduleNames: string[],
    onLoad: (a: any) => void
): void

@singleton()
export class PolyfillLoader {
    constructor(@inject(PromiseFactory) private promiseFactory: PromiseFactory) {

    }

    load = (name: string): Promise<any> => {
        var promise = this.promiseFactory.create<any>((resolve, reject) => {
            require(['lib/polyfills/' + name], result => {
                resolve(result);
            });
        });
        return promise;
    }
}