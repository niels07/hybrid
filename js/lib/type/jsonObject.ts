import { JsonValue } from './jsonValue';

export interface JsonObject {
    [key: string]: JsonValue;
}
