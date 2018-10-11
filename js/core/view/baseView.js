var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lib/di", "./decorator"], function (require, exports, di_1, decorator_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var BaseView = /** @class */ (function () {
        function BaseView(name) {
            var _this = this;
            this.name = name;
            this.loaded = false;
            this.active = false;
            this.callFunction = function (name, args) {
                var view = _this;
                if (!(name in view) || typeof view[name] !== 'function') {
                    throw new Error("'" + name + "' is not a function");
                }
                view[name](args);
            };
            this.getViewName = function () {
                return _this.constructor.toString().match(/function (\w*)/)[1];
            };
            this.getClassName = function (obj) {
                var funcNameRegex = /function (.{1,})\(/;
                var results = (funcNameRegex).exec(obj.constructor.toString());
                return (results && results.length > 1) ? results[1] : "";
            };
            this.registerOnLoadHandlers = function (handlers) {
                for (var i = 0; i < handlers.length; i++) {
                    var handler = handlers[i];
                    _this.addEventHandler('load', function (args) { return _this.callFunction(handler, args); });
                }
            };
            this.registerCallback = function (name) {
                _this.callbacks[name] = function (args) { return _this.callFunction(name, args); };
            };
            this.registerCallbacks = function (callbacks) {
                for (var i = 0; i < callbacks.length; i++) {
                    var callback = callbacks[i];
                    if (!(callback in _this.callbacks)) {
                        _this.registerCallback(callback);
                    }
                }
            };
            this.handleDecorations = function () {
                var name;
                var proto = Object.getPrototypeOf(_this);
                while ((name = _this.getClassName(proto)) !== 'Object') {
                    var d = decorator_1.Decorator.getDecoration(name);
                    if (d) {
                        _this.registerOnLoadHandlers(d.onLoad);
                        _this.registerCallbacks(d.callbacks);
                    }
                    proto = Object.getPrototypeOf(proto);
                }
            };
            this.getElement = function (name) {
                var el = document.querySelector("[data-view=\"" + _this.name + "\"]");
                return name ? el.querySelector(name) : el;
            };
            this.onLoad = function (eventHandler) {
                _this.addEventHandler('load', eventHandler);
            };
            this.show = function () {
                var element = _this.getElement();
                if (element) {
                    _this.active = true;
                    _this.getElement().style.display = 'block';
                }
            };
            this.hide = function () {
                _this.active = false;
                _this.getElement().style.display = 'none';
            };
            this.bindHandler = function (target, handlerName, action) {
                var args = _this.getBindingArgs(target);
                if (action == 'load' && target == _this.getElement()) {
                    var handler = function () { return _this.callbacks[handlerName](args); };
                    _this.addEventHandler(action, handler);
                    return;
                }
                var eventName = 'on' + action;
                if (!(eventName in target)) {
                    throw new Error('unkown action specified: ' + action);
                }
                target[eventName] = function (e) {
                    e.preventDefault();
                    _this.callFunction(handlerName, args);
                };
            };
            this.loadBinding = function (el) {
                if (!el || !el.hasAttribute('data-bind')) {
                    return;
                }
                var bind = el.getAttribute('data-bind').split(':');
                var typeName;
                var handlerName;
                if (bind.length > 1) {
                    var typeName = bind[0].trim();
                    var handlerName = bind[1].trim();
                }
                else {
                    handlerName = bind[0].trim();
                    typeName = 'click';
                }
                if (handlerName in _this.callbacks) {
                    _this.bindHandler(el, handlerName, typeName);
                }
            };
            this.loadBindings = function () {
                var element = _this.getElement();
                if (!element) {
                    return;
                }
                var elements = element.querySelectorAll('[data-bind]');
                for (var i = 0; i < elements.length; i++) {
                    _this.loadBinding(elements[i]);
                }
            };
            this.handleEvents = function (args) {
                if (args === void 0) { args = {}; }
                var viewEl = _this.getElement();
                _this.loadBinding(viewEl);
                var loadEvents = _this.getEventHandlers('load');
                for (var i = 0; i < loadEvents.length; i++) {
                    loadEvents[i](args);
                }
            };
            this.loadData = function (r) {
                _this.data = r.getData();
                if ('content' in _this.data) {
                    _this.renderContent(_this.data['content']);
                }
            };
            this.pushState = function (args) {
                var params = _this.serialize(args);
                var name = _this.getName();
                var newUrl = '/' + name + params;
                var l = window.location;
                var curUrl = l.pathname + l.search + l.hash;
                if (newUrl !== curUrl) {
                    window.history.pushState(name, name, newUrl);
                }
            };
            this.eventHandlers = {};
            this.callbacks = {};
            this.handleDecorations();
        }
        BaseView.prototype.addEventHandler = function (action, handler) {
            if (!(action in this.eventHandlers)) {
                this.eventHandlers[action] = [];
            }
            this.eventHandlers[action].push(handler);
        };
        BaseView.prototype.deleteEventHandler = function (action, handler) {
            if (!(action in this.eventHandlers)) {
                return;
            }
            var eventHandlers = this.eventHandlers[action];
            var index = eventHandlers.indexOf(handler);
            if (index >= 0) {
                eventHandlers.splice(index, index);
            }
        };
        BaseView.prototype.isLoaded = function () {
            return this.loaded;
        };
        BaseView.prototype.getEventHandlers = function (action) {
            if (!(action in this.eventHandlers)) {
                this.eventHandlers[action] = [];
            }
            return this.eventHandlers[action];
        };
        BaseView.prototype.renderContent = function (content) {
            var element = this.getElement();
            if (element) {
                element.innerHTML = content;
            }
        };
        BaseView.prototype.isActive = function () {
            return this.active;
        };
        BaseView.prototype.getBindingArgs = function (el) {
            var argsAttr = el.getAttribute('data-bind-args');
            var args = (argsAttr) ? JSON.parse(argsAttr) : {};
            return args;
        };
        BaseView.prototype.createHandler = function (funcName) {
            var _this = this;
            return function (args) { return _this.callFunction(funcName, args); };
        };
        BaseView.prototype.serialize = function (data) {
            var str = '';
            for (var key in data) {
                if (str != '') {
                    str += '&';
                }
                var value = data[key];
                str += key + "=" + value;
            }
            if (str != '') {
                str = '?' + str;
            }
            return str;
        };
        BaseView.prototype.load = function (args) {
            var _this = this;
            var eventArgs = Object.create(args.args);
            eventArgs['view'] = this.name;
            this.__requestHandler.sendRequest({
                route: this.name,
                action: 'renderView',
                data: eventArgs
            }).then(function (r) {
                _this.loadData(r);
                if (args.handleEvents) {
                    _this.handleEvents(args.args);
                }
                _this.loadBindings();
                _this.loaded = true;
                if (args.onLoad) {
                    args.onLoad(r);
                }
                _this.show();
            }).except(function (e) {
                throw new Error(e);
            });
        };
        BaseView.prototype.getData = function (name) {
            return this.data[name];
        };
        BaseView.prototype.getName = function () {
            return this.name;
        };
        BaseView = __decorate([
            di_1.service()
        ], BaseView);
        return BaseView;
    }());
    exports.BaseView = BaseView;
});
//# sourceMappingURL=baseView.js.map