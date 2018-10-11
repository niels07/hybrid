var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "core/view", "lib/di", "../../model/product/spec/specFactory"], function (require, exports, view_1, di_1, specFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SpecsView = /** @class */ (function (_super) {
        __extends(SpecsView, _super);
        function SpecsView(specFactory) {
            var _this = _super.call(this, 'admin/products/specs') || this;
            _this.specFactory = specFactory;
            _this.deleteSpec = function (name, index) {
                var el = document.getElementById('spec-' + name);
                if (el) {
                    el.outerHTML = '';
                }
                _this.specs.splice(index, 1);
            };
            _this.addSpec = function () {
                var spec = _this.getSpec();
                if (spec) {
                    _this.specs.push(spec);
                    _this.addSpecItem(spec);
                }
            };
            _this.specs = [];
            return _this;
        }
        SpecsView.prototype.getListElement = function () {
            return this.getElement('#admin-product-specs');
        };
        SpecsView.prototype.addSpecElement = function (name, text) {
            var _this = this;
            var ul = document.getElementById('admin-product-specs');
            if (!ul) {
                return;
            }
            var li = document.createElement('li');
            var a = document.createElement('a');
            var index = this.specs.length - 1;
            li.id = 'spec-' + name;
            a.className = 'deleteItem';
            a.href = '';
            a.onclick = function (e) {
                e.preventDefault();
                _this.deleteSpec(name, index);
            };
            a.appendChild(document.createTextNode('Verwijderen'));
            li.appendChild(document.createTextNode(text));
            li.appendChild(a);
            ul.appendChild(li);
        };
        SpecsView.prototype.shorten = function (text, max) {
            if (text.length >= max) {
                text = text.substring(0, max - 3) + '...';
            }
            return text;
        };
        SpecsView.prototype.addSpecItem = function (spec) {
            if (!spec) {
                return;
            }
            var name = spec[0];
            var value = spec[1];
            var text;
            if (value != '') {
                var sName = this.shorten(name, 15);
                var sValue = this.shorten(value, 15);
                text = sName + ": " + sValue;
            }
            else {
                text = this.shorten(name, 30);
            }
            this.addSpecElement(name, text);
        };
        SpecsView.prototype.loadSpecs = function (product) {
            var specs = product.getSpecs();
            if (!specs) {
                return;
            }
            var list = this.getListElement();
            list.innerHTML = '';
            for (var i = 0; i < specs.length; i++) {
                var spec = specs[i];
                this.addSpecItem(spec);
                this.specs.push(spec);
            }
        };
        SpecsView.prototype.getSpec = function () {
            var name = document.getElementById('admin-spec-name').value;
            if (name == '') {
                return undefined;
            }
            var value = document.getElementById('admin-spec-value').value;
            return this.specFactory.create({ name: name, value: value });
        };
        SpecsView.prototype.getSpecs = function () {
            return this.specs;
        };
        SpecsView.prototype.clear = function () {
            var list = this.getListElement();
            this.specs = [];
            list.innerHTML = '';
        };
        __decorate([
            view_1.callback()
        ], SpecsView.prototype, "addSpec", void 0);
        SpecsView = __decorate([
            __param(0, di_1.inject(specFactory_1.SpecFactory))
        ], SpecsView);
        return SpecsView;
    }(view_1.BaseView));
    exports.SpecsView = SpecsView;
});
//# sourceMappingURL=specsView.js.map