define(["require", "exports", "../event/eventType"], function (require, exports, eventType_1) {
    "use strict";
    exports.__esModule = true;
    var EventManager = /** @class */ (function () {
        function EventManager() {
            this.bindings = {};
        }
        EventManager.prototype.getArgs = function (el) {
            var argsAttr = el.getAttribute('data-bind-args');
            var args = (argsAttr) ? JSON.parse(argsAttr) : {};
            return args;
        };
        EventManager.prototype.getEventType = function (eventName) {
            return eventType_1.EventType[eventName];
        };
        EventManager.prototype.loadBinding = function (el) {
            var _this = this;
            var bind = el.getAttribute('data-bind').split(':');
            var type = bind[0].trim();
            var callback = bind[1].trim();
            if (callback == 'load') {
                return;
            }
            if (!(callback in this.bindings)) {
                return;
            }
            type = "on" + type;
            var args = this.getArgs(el);
            el[type] = function (e) {
                e.preventDefault();
                _this.bindings[callback](args);
            };
        };
        EventManager.prototype.getCallback = function (name) {
            return (name in this.bindings)
                ? this.bindings[name]
                : null;
        };
        EventManager.prototype.loadBindings = function () {
            var elements = document.querySelectorAll('[data-bind]');
            for (var i = 0; i < elements.length; i++) {
                this.loadBinding(elements[i]);
            }
        };
        EventManager.prototype.load = function () {
            this.loadBindings();
        };
        EventManager.prototype.addCallback = function (name, callback) {
            this.bindings[name] = callback;
        };
        EventManager.prototype.setCallbacks = function (callbacks) {
            this.bindings = callbacks;
            this.loadBindings();
        };
        return EventManager;
    }());
    exports.EventManager = EventManager;
});
//# sourceMappingURL=eventManager.js.map