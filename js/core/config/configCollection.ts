import { JsonValue, JsonObject  } from 'lib/type';
import { singleton } from 'lib/di';
import { GenericCollection } from 'core/collections';

@singleton()
export class ConfigCollection implements GenericCollection<JsonValue>  {
   
    private items: JsonObject;

    public constructor(data: JsonObject = {}) {
        this.items = data;
    }
    
    public contains = (name: string): boolean => {
        return name in this.items;
    }

    public get = (name: string): JsonValue => {
        return this.contains(name) ? this.items[name] : null;
    }

    public set = (name: string, value: JsonValue) => {
        this.items[name] = value;
    }

    public each(f: (value: JsonValue) => void): void {
        for (var i in this.items) {
            f(this.items[i]);
        }
    }

    public setData = (data: JsonObject): void => {
        this.items = data;
    }

    forEach(handler: () => boolean | void): void;
    forEach(handler: (item: JsonValue) => boolean | void): void;
    forEach(handler: (key: string, item: JsonValue) => boolean | void): void;
    forEach(handler: any) {
        throw new Error("Method not implemented.");
    }
}
