import { ModelInit } from './modelInit';

export class DataModel {

    private data: ModelInit | undefined;
    [index: string]: any;

    constructor(data?: ModelInit) {
        if (!data) {
            data = {};
        }
        this.data = data;
        for (var i in data) {
            this[i] = data[i];
        }
    }

    toJson(): string {
        return JSON.stringify(this.data);
    }
}