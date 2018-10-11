
import { ServiceFactory, singleton } from 'lib/di';
import { ArgumentError } from 'lib/errors';
import { UserModel } from './userModel';

@singleton()
export class UserFactory extends ServiceFactory {

    public constructor() {
        super(UserModel);
    }

    create(args: { 'id': number, 'name': string }): UserModel;
    create(id: number, name: string): UserModel;
    create(...args: any[]): UserModel {
        var id: number;
        var name: string;

        if (typeof (args[0]) === 'number') {
            id = args[0];
            name = args[1];
        } else {
            id = args[0]['id'];
            name = args[0]['name'];
        }
        return super.create(id, name);
    }
}