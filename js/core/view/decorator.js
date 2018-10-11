define(["require", "exports", "./baseView"], function (require, exports, baseView_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Decorator = /** @class */ (function () {
        function Decorator() {
        }
        Decorator.getClassName = function (view) {
            return view.constructor.toString().match(/function (\w*)/)[1];
        };
        Decorator.addView = function (name) {
            if (!(name in Decorator.viewDecorations)) {
                Decorator.viewDecorations[name] = {
                    callbacks: [],
                    onLoad: []
                };
            }
        };
        Decorator.callback = function (view, name) {
            var viewName = Decorator.getClassName(view);
            Decorator.addView(viewName);
            Decorator.viewDecorations[viewName].callbacks.push(name);
        };
        Decorator.onLoad = function (view, name) {
            var viewName = Decorator.getClassName(view);
            Decorator.addView(viewName);
            Decorator.viewDecorations[viewName].onLoad.push(name);
        };
        Decorator.getDecoration = function (view) {
            var viewName = view instanceof baseView_1.BaseView ? Decorator.getClassName(view) : view;
            return viewName in Decorator.viewDecorations
                ? Decorator.viewDecorations[viewName]
                : undefined;
        };
        Decorator.viewDecorations = {};
        return Decorator;
    }());
    exports.Decorator = Decorator;
});
//# sourceMappingURL=decorator.js.map