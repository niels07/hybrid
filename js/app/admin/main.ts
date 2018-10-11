import { App } from 'core/app';

export class Admin {
    public load(): void {
        var app = new App('/js/app/admin/config.json');
        app.dispatch();
    }
}
