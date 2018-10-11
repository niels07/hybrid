import { BaseView } from './baseView';
import { EventHandler } from '../event';
import { EventInfo } from './eventInfo';

interface ViewDecoration {
    callbacks: Array<string>;
    onLoad: Array<string>;
}

export class Decorator {
    private static viewDecorations: { [key: string]: ViewDecoration } = {}

    private static getClassName(view: BaseView): string {
        return view.constructor.toString().match(/function (\w*)/)![1];
    }

    private static addView(name: string): void {
         if (!(name in Decorator.viewDecorations)) {
            Decorator.viewDecorations[name] = {
                callbacks: [],
                onLoad: []
            };
        }
    }

    static callback(view: BaseView, name: string) : void {
        var viewName = Decorator.getClassName(view);
        Decorator.addView(viewName);
        Decorator.viewDecorations[viewName].callbacks.push(name);
    }

    static onLoad(view: BaseView, name: string): void {
        var viewName = Decorator.getClassName(view);
        Decorator.addView(viewName);
        Decorator.viewDecorations[viewName].onLoad.push(name);
    }

    static getDecoration(view: BaseView | string): ViewDecoration | undefined {
        var viewName = view instanceof BaseView ? Decorator.getClassName(view) : view;
        return viewName in Decorator.viewDecorations
            ? Decorator.viewDecorations[viewName]
            : undefined;
    }
}