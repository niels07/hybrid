import { XHRequestHandler } from 'core/http';
import { GenericModelManager } from '../genericModelManager';
import { UserModel } from './userModel';
import { UserFactory } from './userFactory';
import { singleton, inject } from 'lib/di';

@singleton()
export class UserManager extends GenericModelManager<UserModel> {

    constructor(
        @inject(XHRequestHandler) requestHandler: XHRequestHandler,
        @inject(UserFactory) userFactory: UserFactory) {
        super(requestHandler, userFactory, 'admin/user');
    }
}
 