
import { service } from 'lib/di';

@service()
export class CategoryModel {
    constructor(private id: number, private name: string, private thumbnail: string) {
    }

    getId = (): number => {
        return this.id;
    }

    getName = (): string => {
        return this.name;
    }

    getThumbNail = (): string => {
        return this.thumbnail;
    }
}