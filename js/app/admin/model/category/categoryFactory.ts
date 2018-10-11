
import { ServiceFactory, singleton } from 'lib/di';
import { CategoryModel } from './categoryModel';
import { ArgumentError } from 'lib/errors';

@singleton()
export class CategoryFactory extends ServiceFactory {

    public constructor() {
        super(CategoryModel);
    }

    create(arg1: {'id': number, 'name': string, 'thumbnail': string }): CategoryModel;
    create(arg1: number, arg2: string, arg3: string): CategoryModel;
    create(...args: any[]): CategoryModel {
        var id: number;
        var name: string;
        var tn: string;

        if (typeof (args[0]) === 'string') {
            id = args[0];
            name = args[1];
            tn = args[2];
        } else {
            id = args[0]['id'];
            name = args[0]['name'];
            tn = args[0]['thumbnail'];
        }
        return super.create(id, name, tn);
    }
}