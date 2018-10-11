var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lib/di", "./userModel"], function (require, exports, di_1, userModel_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UserFactory = /** @class */ (function (_super) {
        __extends(UserFactory, _super);
        function UserFactory() {
            return _super.call(this, userModel_1.UserModel) || this;
        }
        UserFactory.prototype.create = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var id;
            var name;
            if (typeof (args[0]) === 'number') {
                id = args[0];
                name = args[1];
            }
            else {
                id = args[0]['id'];
                name = args[0]['name'];
            }
            return _super.prototype.create.call(this, id, name);
        };
        UserFactory = __decorate([
            di_1.singleton()
        ], UserFactory);
        return UserFactory;
    }(di_1.ServiceFactory));
    exports.UserFactory = UserFactory;
});
//# sourceMappingURL=userFactory.js.map