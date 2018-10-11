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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "core/view", "core/view", "app/admin/io/output", "lib/di", "app/admin/model/user/userManager", "app/admin/html/htmlHelper"], function (require, exports, view_1, view_2, output_1, di_1, userManager_1, htmlHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UsersView = /** @class */ (function (_super) {
        __extends(UsersView, _super);
        function UsersView(userManager, output, htmlHelper) {
            var _this = _super.call(this, 'admin/users') || this;
            _this.userManager = userManager;
            _this.output = output;
            _this.htmlHelper = htmlHelper;
            _this.addUserOption = function (user) {
                var opt = _this.htmlHelper.createSelectOption('user', user.getId(), user.getName());
                _this.usersSelect.add(opt);
            };
            _this.setUserOption = function (user) {
                var id = user.getId();
                var name = user.getName();
                var opt = document.getElementById('user-' + id);
                if (opt) {
                    opt.value = id.toString();
                    opt.text = name;
                }
                else {
                    _this.addUserOption(user);
                }
            };
            _this.resetFields = function () {
                _this.nameField.value = '';
                _this.passField.value = '';
                _this.nameField.innerText = '';
                _this.passField.innerText = '';
                _this.changePassCbx.checked = true;
                _this.changePassDiv.style.display = 'none';
                _this.passField.readOnly = false;
            };
            _this.selectUser = function (username) {
                _this.nameField.value = username;
                _this.changePassCbx.checked = false;
                _this.changePassDiv.style.display = 'block';
                _this.passField.readOnly = true;
                _this.passField.value = '';
            };
            _this.getElements = function () {
                _this.nameField = document.getElementById('admin-user-name');
                _this.passField = document.getElementById('admin-user-password');
                _this.changePassCbx = document.getElementById('admin-user-changepass');
                _this.changePassDiv = document.querySelector('.change-pass-field');
                _this.usersSelect = document.getElementById('admin-user-list');
            };
            _this.onViewLoad = function () {
                _this.getElements();
                _this.usersSelect.innerHTML = '';
                var opt = _this.htmlHelper.createSelectOption(0, 'Nieuwe Gebruiker');
                _this.usersSelect.add(opt);
                _this.userManager.fetch().then(function (users) {
                    for (var i = 0; i < users.length; i++) {
                        _this.setUserOption(users[i]);
                    }
                });
                _this.resetFields();
            };
            _this.loadUserFields = function () {
                var userId = parseInt(_this.usersSelect.value);
                var userName = _this.htmlHelper.getSelectText(_this.usersSelect);
                if (userId == 0) {
                    _this.resetFields();
                }
                else {
                    _this.selectUser(userName);
                }
            };
            _this.validateFields = function () {
                var username = _this.nameField.value;
                var password = _this.passField.value;
                if (username.trim() === '' || password.trim() === '') {
                    _this.output.error('Gebruiker en wachtwoord mogen niet leeg zijn');
                    return false;
                }
                if (_this.usersSelect.value !== '0') {
                    return true;
                }
                var options = _this.usersSelect.options;
                for (var i = 0; i < options.length; i++) {
                    var opt = options[i];
                    var name = opt.text;
                    if (name == username) {
                        _this.output.error('Gebruikersnaam is al in gebruik');
                        return false;
                    }
                }
                return true;
            };
            _this.setChangePass = function () {
                _this.passField.readOnly = !_this.changePassCbx.checked;
            };
            _this.saveUser = function () {
                if (!_this.validateFields()) {
                    return;
                }
                var form = document.getElementById('admin-user-form');
                _this.userManager.save(form).then(function (u) {
                    _this.setUserOption(u);
                    _this.output.write('Gebruiker is opgeslagen.');
                    _this.resetFields();
                });
            };
            _this.deleteUser = function () {
                var id = parseInt(_this.usersSelect.value);
                if (id == 0) {
                    return;
                }
                _this.userManager.delete(id).then(function (u) {
                    var opt = document.getElementById('user-' + id);
                    if (opt) {
                        _this.usersSelect.removeChild(opt);
                    }
                    _this.output.write('Gebruiker is verwijderd.');
                    _this.resetFields();
                });
            };
            return _this;
        }
        __decorate([
            view_2.onLoad()
        ], UsersView.prototype, "onViewLoad", void 0);
        __decorate([
            view_2.callback()
        ], UsersView.prototype, "loadUserFields", void 0);
        __decorate([
            view_2.callback()
        ], UsersView.prototype, "setChangePass", void 0);
        __decorate([
            view_2.callback()
        ], UsersView.prototype, "saveUser", void 0);
        __decorate([
            view_2.callback()
        ], UsersView.prototype, "deleteUser", void 0);
        UsersView = __decorate([
            __param(0, di_1.inject(userManager_1.UserManager)),
            __param(1, di_1.inject(output_1.Output)),
            __param(2, di_1.inject(htmlHelper_1.HTMLHelper))
        ], UsersView);
        return UsersView;
    }(view_1.PageView));
    exports.UsersView = UsersView;
});
//# sourceMappingURL=usersView.js.map