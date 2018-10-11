import { PromiseState } from './promiseState';
import { PromiseCallback } from './promiseCallback';
import { service } from 'lib/di';

type OnFulfilled<T, TResult> = (value: T) => TResult | Promise<TResult> | never;
type OnRejected<TResult> = (reason: any) => TResult;

interface PromiseHandler {
    onFulfilled?: OnFulfilled<any, any>;
    onRejected?: OnRejected<any>;
}

@service()
export class Promise<T> {
    private state: PromiseState;
    private value: T;
    private error: any;
    private handlers: Array<PromiseHandler>;

    constructor(private callback: PromiseCallback<T>) {
        this.state = PromiseState.Pending;
        var done = false;
        this.handlers = [];
        this.doResolve(callback, this.resolve, this.reject);
    }

    getValue = (): T => {
        return this.value;
    }

    getError = (): any => {
        return this.error;
    }

    getState = (): PromiseState => {
        return this.state;
    }

    private setChangeError = (state: PromiseState, reason: string): void => {
        throw new Error(`Cannot set state to '${PromiseState[state]}': ${reason}`);
    }

    private handle = (handler: PromiseHandler) => {
        switch (this.state) {
            case PromiseState.Pending:
                this.handlers.push(handler);
                break;
            case PromiseState.Fulfilled:
                if (handler.onFulfilled) {
                    handler.onFulfilled(this.value)
                }
                break;
            case PromiseState.Rejected:
                if (handler.onRejected) {
                    handler.onRejected(this.error);
                }
                break;
        }
    }

    private invokeHandlers = (): void => {
        for (var i = 0; i < this.handlers.length; i++) {
            var handler = this.handlers[i];
            this.handle(handler);
        }
        this.handlers = [];
    }

    fulfill = (value: T) => {
        this.value = value;
        this.state = PromiseState.Fulfilled;
        this.invokeHandlers();
    }

    reject = (reason: any) => {
        this.error = reason;
        this.state = PromiseState.Rejected;
        this.invokeHandlers();
    }

    private handleAsync = (
        onFulfilled: OnFulfilled<any, any>,
        onRejected: OnRejected<any>): void => {
        setTimeout(() => this.handle({
            onFulfilled: onFulfilled,
            onRejected: onRejected
        }), 0);
    }

    private getFulfillHandler = (
        resolve: (value: any) => any,
        reject: (reason: any) => any,
        onFulfilled?: OnFulfilled<any, any>): (value: any) => any => {

        return v => {
            if (!onFulfilled) {
                return resolve(v);
            }
            try {
                var result = onFulfilled(v);
                return resolve(result);
            } catch (e) {
                return reject(e);
            }
        }
    }

    private getRejectHandler = (
        resolve: (value: any) => any,
        reject: (reason: any) => any,
        onRejected?: OnRejected<any>): (reason: any) => any => {

        return r => {
            if (!onRejected) {
                return reject(r);
            }
            try {
                var result = onRejected(r);
                return resolve(result);
            } catch (e) {
                return reject(e);
            }
        }
    }

    private getPromiseCallback = (
        onFulfilled?: OnFulfilled<any, any>,
        onRejected?: OnRejected<any>) => {

        return (resolve: (value: any) => any, reject: (reason: any) => any) => {
            var onFulfilledHandle = this.getFulfillHandler(
                resolve,
                reject,
                onFulfilled);

            var onRejectedHandle = this.getRejectHandler(
                resolve,
                reject,
                onRejected);

            return this.handleAsync(onFulfilledHandle, onRejectedHandle);
        };
    }

    then = <TResult1, TResult2 = never>(
        onFulfilled?: OnFulfilled<T, TResult1>,
        onRejected?: OnRejected<TResult2>) => {

        var callback = this.getPromiseCallback(onFulfilled, onRejected);
        return new Promise<TResult1>(callback);
    }

    except = <TResult = never>(onRejected: OnRejected<TResult>) => {
        return this.then(undefined, onRejected);
    }

    private doResolve(
        fn: (onFulfilled: (value: any) => void, onRejected: (reason: any) => void) => void,
        resolve: (value: any) => void,
        reject: (reason: any) => void) {

        var done = false;
        try {
            fn(v => {
                if (!done) {
                    done = true;
                    resolve(v);
                }
            }, e => {
                if (!done) {
                    done = true;
                    reject(e);
                }
            })
        } catch (e) {
            if (!done) {
                done = true;
                reject(e)
            }
        }
    }

    private resolve = (value: T | Promise<any>) => {
        var done = false;
        try {
            if (!value || typeof (<Promise<T>>value).then !== 'function') {
                this.fulfill(<T>value);
                return;
            }
            var promise = <Promise<T>>value;
            var then = promise.then.bind(promise);
            this.doResolve(then, this.resolve, this.reject);
        } catch (e) {
            this.reject(e);
        }
    }
}

