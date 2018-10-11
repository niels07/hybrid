import { XHRequestHandler } from 'core/http/xhRequestHandler';
import { EventHandler } from 'core/event/eventHandler';
import { EventArgs } from 'core/event/eventArgs';
import { service } from 'lib/di';
import { LoadViewArgs } from './loadViewArgs';
import { EventInfo } from './eventInfo';
import { Decorator } from './decorator';
import { XHResponse } from '../http';

type CallbackDict = { [key: string]: { [key: string]: string } };
type EventDict = { [key: string]: Array<EventInfo> };
type EventHandlerDict = { [key: string]: Array<EventHandler> };

@service()
export class BaseView {
    private loaded: boolean = false;
    private active: boolean = false;
    private callbacks: { [key: string]: EventHandler };
    private data: { [key: string]: any };

    private eventHandlers: EventHandlerDict;
    private __requestHandler: XHRequestHandler;

    constructor(private name: string) {
        this.eventHandlers = {};
        this.callbacks = {};
        this.handleDecorations();
    }

    private callFunction = (name: string, args?: EventArgs): void => {
        var view = <{ [index: string]: Function }><object>this;
        if (!(name in view) || typeof view[name] !== 'function') {
            throw new Error(`'${name}' is not a function`);
        }
        view[name](args);
    }

    private getViewName = (): string => {
        return this.constructor.toString().match(/function (\w*)/)![1];
    }

    private getClassName = (obj: any): string => {
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec(obj.constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }

    private registerOnLoadHandlers = (handlers: Array<string>): void => {
        for (var i = 0; i < handlers.length; i++) {
            var handler = handlers[i];
            this.addEventHandler('load', args => this.callFunction(handler, args));
        }
    }

    private registerCallback = (name: string): void => {
        this.callbacks[name] = args => this.callFunction(name, args);
    }

    private registerCallbacks = (callbacks: Array<string>): void => {
        for (var i = 0; i < callbacks.length; i++) {
            var callback = callbacks[i];
            if (!(callback in this.callbacks)) {
                this.registerCallback(callback);
            }
        }
    }

    private handleDecorations = (): void => {
        var name;
        var proto = Object.getPrototypeOf(this);

        while ((name = this.getClassName(proto)) !== 'Object') {
            var d = Decorator.getDecoration(name);
            if (d) {
                this.registerOnLoadHandlers(d.onLoad);
                this.registerCallbacks(d.callbacks);
            }
            proto = Object.getPrototypeOf(proto);
        }
    }

    getElement = (name?: string): HTMLElement => {
        var el = <HTMLElement>document.querySelector(`[data-view="${this.name}"]`);
        return name ? <HTMLElement>el.querySelector(name) : el;
    }

    onLoad = (eventHandler: EventHandler): void => {
        this.addEventHandler('load', eventHandler);
    }

    addEventHandler(action: string, handler: EventHandler): void {
        if (!(action in this.eventHandlers)) {
            this.eventHandlers[action] = [];
        }
        this.eventHandlers[action].push(handler);
    }

    deleteEventHandler(action: string, handler: EventHandler): void {
        if (!(action in this.eventHandlers)) {
            return;
        }
        var eventHandlers = this.eventHandlers[action];
        var index = eventHandlers.indexOf(handler);
        if (index >= 0) {
            eventHandlers.splice(index, index);
        }
    }

    isLoaded(): boolean {
        return this.loaded;
    }

    private getEventHandlers(action: string): Array<EventHandler> {
        if (!(action in this.eventHandlers)) {
            this.eventHandlers[action] = [];
        }
        return this.eventHandlers[action];
    }

    private renderContent(content: string): void {
        var element = this.getElement();
        if (element) {
            element.innerHTML = content;
        }
    }

    show = (): void => {
        var element = this.getElement();
        if (element) {
            this.active = true;
            this.getElement().style.display = 'block';
        }
    }

    hide = (): void => {
        this.active = false;
        this.getElement().style.display = 'none';
    }

    isActive(): boolean {
        return this.active;
    }

    private getBindingArgs(el: HTMLElement) {
        var argsAttr = el.getAttribute('data-bind-args');
        var args = (argsAttr) ? JSON.parse(argsAttr) : {};
        return args;
    }

    private createHandler(funcName: string): EventHandler {
        return args => this.callFunction(funcName, args)
    }

    private bindHandler = (target: HTMLElement, handlerName: string, action: string): void => {
        var args = this.getBindingArgs(target);

        if (action == 'load' && target == this.getElement()) {
            var handler = () => this.callbacks[handlerName](args);
            this.addEventHandler(action, handler);
            return;
        }
        var eventName = 'on' + action;
        if (!(eventName in target)) {
            throw new Error('unkown action specified: ' + action);
        }

        (<{ [index: string]: any }>target)[eventName] = (e: Event) => {
            e.preventDefault();
            this.callFunction(handlerName, args)
        };
    }

    private loadBinding = (el: HTMLElement): void => {
        if (!el || !el.hasAttribute('data-bind')) {
            return;
        }
        var bind = el!.getAttribute('data-bind')!.split(':');
        var typeName: string;
        var handlerName: string;
        if (bind.length > 1) {
            var typeName = bind[0].trim();
            var handlerName = bind[1].trim();
        } else {
            handlerName = bind[0].trim();
            typeName = 'click';
        }
        if (handlerName in this.callbacks) {
            this.bindHandler(el, handlerName, typeName);
        }
    }

    private loadBindings = (): void => {
        var element = this.getElement();
        if (!element) {
            return;
        }
        var elements = element.querySelectorAll('[data-bind]');
        for (var i = 0; i < elements.length; i++) {
            this.loadBinding(<HTMLElement>elements[i]);
        }
    }

    private handleEvents = (args: EventArgs = {}): void => {
        var viewEl = this.getElement();
        this.loadBinding(viewEl);
        var loadEvents = this.getEventHandlers('load');
        for (var i = 0; i < loadEvents.length; i++) {
            loadEvents[i](args);
        }
    }

    private loadData = (r: XHResponse): void => {
        this.data = r.getData();
        if ('content' in this.data) {
            this.renderContent(this.data['content']);
        }
    }

    private serialize(data: { [key: string]: any }): string {
        var str = '';
        for (var key in data) {
            if (str != '') { str += '&'; }
            var value = data[key];
            str += `${key}=${value}`;
        }
        if (str != '') { str = '?' + str; }
        return str;
    }

    pushState = (args: EventArgs) => {
        var params = this.serialize(args);
        var name = this.getName();
        var newUrl = '/' + name + params;

        var l = window.location;
        var curUrl = l.pathname + l.search + l.hash;
        if (newUrl !== curUrl) {
            window.history.pushState(name, name, newUrl);
        }
    }

    load(args: LoadViewArgs) {
        var eventArgs = Object.create(<object | null>args.args);
        eventArgs['view'] = this.name;

        this.__requestHandler.sendRequest({
            route: this.name,
            action: 'renderView',
            data: eventArgs
        }).then(r => {
            this.loadData(r);
            if (args.handleEvents) {
                this.handleEvents(args.args);
            }
            this.loadBindings();
            this.loaded = true;
            if (args.onLoad) {
                args.onLoad(r);
            }
            this.show();
        }).except(e => {
            throw new Error(e);
        });
    }

    getData(name: string): any {
        return this.data[name];
    }

    getName(): string {
        return this.name;
    }
}
