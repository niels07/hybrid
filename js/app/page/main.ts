import { App } from 'core/app';

export class Page {
    public load(): void {
        var app = new App('/js/app/page/config.json');
        app.dispatch();
    }
}
