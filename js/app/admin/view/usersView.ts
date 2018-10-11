import { PageView } from 'core/view';
import { callback, onLoad } from 'core/view';
import { Output } from 'app/admin/io/output';
import { inject } from 'lib/di';
import { UserManager } from 'app/admin/model/user/userManager';
import { UserModel } from 'app/admin/model/user/userModel';
import { HTMLHelper } from 'app/admin/html/htmlHelper';

export class UsersView extends PageView {
    
    private usersSelect: HTMLSelectElement;
    private nameField: HTMLInputElement;
    private passField: HTMLInputElement;
    private changePassCbx: HTMLInputElement;
    private changePassDiv: HTMLDivElement;

    public constructor(
        @inject(UserManager) private userManager: UserManager,
        @inject(Output) private output: Output,
        @inject(HTMLHelper) private htmlHelper: HTMLHelper) {
        super('admin/users');
    }
    
    private addUserOption = (user: UserModel): void => {
        var opt = this.htmlHelper.createSelectOption('user', user.getId(), user.getName());
        this.usersSelect.add(opt);
    }
    
    private setUserOption = (user: UserModel): void => {
        var id = user.getId();
        var name = user.getName();
        var opt = <HTMLOptionElement>document.getElementById('user-' + id);
        if (opt) {
            opt.value = id.toString();
            opt.text = name;
        } else {
            this.addUserOption(user);
        }
    }

    private resetFields = (): void => {
        this.nameField.value = '';
        this.passField.value = '';
        this.nameField.innerText = '';
        this.passField.innerText = '';
        this.changePassCbx.checked = true;
        this.changePassDiv.style.display = 'none';
        this.passField.readOnly = false;
    }

    private selectUser = (username: string) => {
        this.nameField.value = username;
        this.changePassCbx.checked = false;
        this.changePassDiv.style.display = 'block';
        this.passField.readOnly = true;
        this.passField.value = '';
    }

    private getElements = (): void => {
        this.nameField = <HTMLInputElement>document.getElementById('admin-user-name');
        this.passField = <HTMLInputElement>document.getElementById('admin-user-password');
        this.changePassCbx = <HTMLInputElement>document.getElementById('admin-user-changepass');
        this.changePassDiv = <HTMLDivElement>document.querySelector('.change-pass-field');
        this.usersSelect = <HTMLSelectElement>document.getElementById('admin-user-list');
    }

    @onLoad()
    onViewLoad = () => {
        this.getElements();
        this.usersSelect.innerHTML = '';

        var opt = this.htmlHelper.createSelectOption(0, 'Nieuwe Gebruiker');
        this.usersSelect.add(opt);
        this.userManager.fetch().then(users => {
            for (var i = 0; i < users.length; i++) {
                this.setUserOption(users[i]);
            }
        });
        this.resetFields();
    }

    @callback()
    loadUserFields = () => {
        var userId = parseInt(this.usersSelect.value);
        var userName = this.htmlHelper.getSelectText(this.usersSelect);
        if (userId == 0) {
            this.resetFields();
        } else {
            this.selectUser(userName);
        }
    }

    private validateFields = (): boolean => {
        var username = this.nameField.value;
        var password = this.passField.value;

        if (username.trim() === '' || password.trim() === '') {
            this.output.error('Gebruiker en wachtwoord mogen niet leeg zijn');
            return false;
        }

        if (this.usersSelect.value !== '0') {
            return true;
        }

        var options = this.usersSelect.options;

        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var name = opt.text;

            if (name == username) {
                this.output.error('Gebruikersnaam is al in gebruik');
                return false;
            }
        }
        return true;
    }

    @callback()
    setChangePass = (): void => {
        this.passField.readOnly = !this.changePassCbx.checked;
    }

    @callback()
    saveUser = (): void => {
        if (!this.validateFields()) {
            return;
        }
        var form = <HTMLFormElement>document.getElementById('admin-user-form');
        this.userManager.save(form).then(u => {
            this.setUserOption(u);
            this.output.write('Gebruiker is opgeslagen.');
            this.resetFields();
        });
    }

    @callback()
    private deleteUser = (): void => {
        var id = parseInt(this.usersSelect.value);
        if (id == 0) {
            return;
        }
        this.userManager.delete(id).then(u => {
            var opt = document.getElementById('user-' + id);
            if (opt) {
                this.usersSelect.removeChild(opt);
            }
            this.output.write('Gebruiker is verwijderd.');
            this.resetFields();
        });
    }
}
