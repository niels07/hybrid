var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "./promiseState", "lib/di"], function (require, exports, promiseState_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Promise = /** @class */ (function () {
        function Promise(callback) {
            var _this = this;
            this.callback = callback;
            this.getValue = function () {
                return _this.value;
            };
            this.getError = function () {
                return _this.error;
            };
            this.getState = function () {
                return _this.state;
            };
            this.setChangeError = function (state, reason) {
                throw new Error("Cannot set state to '" + promiseState_1.PromiseState[state] + "': " + reason);
            };
            this.handle = function (handler) {
                switch (_this.state) {
                    case promiseState_1.PromiseState.Pending:
                        _this.handlers.push(handler);
                        break;
                    case promiseState_1.PromiseState.Fulfilled:
                        if (handler.onFulfilled) {
                            handler.onFulfilled(_this.value);
                        }
                        break;
                    case promiseState_1.PromiseState.Rejected:
                        if (handler.onRejected) {
                            handler.onRejected(_this.error);
                        }
                        break;
                }
            };
            this.invokeHandlers = function () {
                for (var i = 0; i < _this.handlers.length; i++) {
                    var handler = _this.handlers[i];
                    _this.handle(handler);
                }
                _this.handlers = [];
            };
            this.fulfill = function (value) {
                _this.value = value;
                _this.state = promiseState_1.PromiseState.Fulfilled;
                _this.invokeHandlers();
            };
            this.reject = function (reason) {
                _this.error = reason;
                _this.state = promiseState_1.PromiseState.Rejected;
                _this.invokeHandlers();
            };
            this.handleAsync = function (onFulfilled, onRejected) {
                setTimeout(function () { return _this.handle({
                    onFulfilled: onFulfilled,
                    onRejected: onRejected
                }); }, 0);
            };
            this.getFulfillHandler = function (resolve, reject, onFulfilled) {
                return function (v) {
                    if (!onFulfilled) {
                        return resolve(v);
                    }
                    try {
                        var result = onFulfilled(v);
                        return resolve(result);
                    }
                    catch (e) {
                        return reject(e);
                    }
                };
            };
            this.getRejectHandler = function (resolve, reject, onRejected) {
                return function (r) {
                    if (!onRejected) {
                        return reject(r);
                    }
                    try {
                        var result = onRejected(r);
                        return resolve(result);
                    }
                    catch (e) {
                        return reject(e);
                    }
                };
            };
            this.getPromiseCallback = function (onFulfilled, onRejected) {
                return function (resolve, reject) {
                    var onFulfilledHandle = _this.getFulfillHandler(resolve, reject, onFulfilled);
                    var onRejectedHandle = _this.getRejectHandler(resolve, reject, onRejected);
                    return _this.handleAsync(onFulfilledHandle, onRejectedHandle);
                };
            };
            this.then = function (onFulfilled, onRejected) {
                var callback = _this.getPromiseCallback(onFulfilled, onRejected);
                return new Promise_1(callback);
            };
            this.except = function (onRejected) {
                return _this.then(undefined, onRejected);
            };
            this.resolve = function (value) {
                var done = false;
                try {
                    if (!value || typeof value.then !== 'function') {
                        _this.fulfill(value);
                        return;
                    }
                    var promise = value;
                    var then = promise.then.bind(promise);
                    _this.doResolve(then, _this.resolve, _this.reject);
                }
                catch (e) {
                    _this.reject(e);
                }
            };
            this.state = promiseState_1.PromiseState.Pending;
            var done = false;
            this.handlers = [];
            this.doResolve(callback, this.resolve, this.reject);
        }
        Promise_1 = Promise;
        Promise.prototype.doResolve = function (fn, resolve, reject) {
            var done = false;
            try {
                fn(function (v) {
                    if (!done) {
                        done = true;
                        resolve(v);
                    }
                }, function (e) {
                    if (!done) {
                        done = true;
                        reject(e);
                    }
                });
            }
            catch (e) {
                if (!done) {
                    done = true;
                    reject(e);
                }
            }
        };
        Promise = Promise_1 = __decorate([
            di_1.service()
        ], Promise);
        return Promise;
        var Promise_1;
    }());
    exports.Promise = Promise;
});
//# sourceMappingURL=promise.js.map