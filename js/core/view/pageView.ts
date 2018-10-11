import { BaseView } from './baseView';
import { inject } from 'lib/di';
import { callback } from './callback';
import { XHRequestHandler } from 'core/http';
import { EventArgs, EventHandler } from '../event';
import { LoadViewArgs } from './loadViewArgs';
import { XHResponse } from '../http/xhResponse';

export class PageView extends BaseView {
    private __loadViewArgs: LoadViewArgs;

    constructor(name: string) {
        super(name);
    }
    
    load(args: LoadViewArgs) {
        var onLoad = (response: XHResponse) => {
            if (args.args) {
                this.pushState(args.args);
            }

            if (args.onLoad) {
                args.onLoad(response);
            }

            if (!('data' in response)) {
                return;
            }

            var data = response['data'];
            var title = data['title'];

            if (title) {
                document.title = title;
            }
        }
        this.__loadViewArgs = {
            onLoad: onLoad,
            args: args.args,
            handleEvents: args.handleEvents
        };
        super.load(this.__loadViewArgs);
    }
}
