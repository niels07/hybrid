import { XHRequestHandler } from 'core/http';
import { EventHandler } from 'core/event';
import { GenericCollection } from './genericCollection';

export abstract class GenericCollectionBase<T> implements GenericCollection<T> {

    private items: { [key: string]: T };

    constructor() {
        this.items = {};
    }

    contains = (name: string): boolean => {
        return name in this.items;
    }

    get = (name: string): T | undefined => {
        return this.contains(name) ? this.items[name] : undefined;
    }

    delete = (id: string): void => {
        delete this.items[id];
    }

    set(name: string, item: T): void {
        this.items[name] = item;
    }

    forEach(handler: () => boolean): void;
    forEach(handler: () => void): void;
    forEach(handler: (item: T) => void): void;
    forEach(handler: (item: T) => boolean): void;
    forEach(handler: (key: string, item: T) => void): void;
    forEach(handler: (key: string, item: T) => boolean): void;
    forEach(handler: (() => boolean | void) | ((item: T) => boolean | void) | ((key: string, item: T) => boolean | void)) {
        for (var key in this.items) {
            var next;
            switch (handler.length) {
                case 0:
                    next = (<() => boolean | void>handler)();
                    break;
                case 1:
                    next = (<(item: T) => boolean | void>handler)(this.items[key]);
                    break;
                default:
                    next = (<(key: string, item: T) => boolean | void>handler)(key, this.items[key]);
                    break;
            }
            if (next === false) {
                break;
            }
        }
    }
}
