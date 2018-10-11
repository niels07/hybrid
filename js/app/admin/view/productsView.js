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
define(["require", "exports", "core/view", "lib/di", "../model/product/productManager", "../html/htmlHelper", "../model/category/categoryManager", "core/view", "../io/output"], function (require, exports, view_1, di_1, productManager_1, htmlHelper_1, categoryManager_1, view_2, output_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProductsView = /** @class */ (function (_super) {
        __extends(ProductsView, _super);
        function ProductsView(productManager, categoryManager, htmlHelper, output) {
            var _this = _super.call(this, 'admin/products') || this;
            _this.productManager = productManager;
            _this.categoryManager = categoryManager;
            _this.htmlHelper = htmlHelper;
            _this.output = output;
            _this.setField = function (name, value) {
                var elName = 'admin-product-' + name;
                var el = document.getElementById(elName);
                if (el) {
                    el.value = value;
                }
            };
            _this.addProductOption = function (product) {
                var id = product.getId();
                var name = product.getName();
                var text = id !== 0 ? "[" + id + "] " + name : name;
                var opt = _this.htmlHelper.createSelectOption('product', id, text);
                _this.productsSelect.add(opt);
            };
            _this.addCategoryOption = function (category) {
                var id = category.getId();
                var name = category.getName();
                var text = id !== 0 ? "[" + id + "] " + name : name;
                var opt = _this.htmlHelper.createSelectOption('category', id, text);
                _this.categoriesSelect.add(opt);
            };
            _this.loadCategorySelection = function () {
                _this.categoriesSelect.innerHTML = '';
                _this.categoryManager.fetch().then(function (categories) {
                    for (var i = 0; i < categories.length; i++) {
                        _this.addCategoryOption(categories[i]);
                    }
                });
            };
            _this.getForm = function () {
                return document.getElementById('admin-product-form');
            };
            _this.setProductField = function (product, field) {
                var name = field.name;
                var getMethod = 'get' + name.charAt(0).toUpperCase() + name.slice(1);
                if (getMethod in product) {
                    field.value = product[getMethod]();
                }
            };
            _this.clearProductFields = function () {
                var productFields = document.querySelectorAll('#admin-product-details input');
                for (var i = 0; i < productFields.length; i++) {
                    productFields[i].value = '';
                }
            };
            _this.productSelectionChanged = function (product) {
                var e = new CustomEvent('ProductSelectionChanged', {
                    detail: product,
                    bubbles: true,
                });
                dispatchEvent(e);
            };
            _this.loadProductFields = function () {
                var id = parseInt(_this.productsSelect.value);
                if (id == 0) {
                    _this.clearProductFields();
                    _this.productSelectionChanged();
                    return;
                }
                var product = _this.products[id];
                _this.categoriesSelect.value = product.getCategoryId().toString();
                var productFields = document.querySelectorAll('\
            #admin-product-details input,   \
            #admin-product-details textarea \
        ');
                for (var i = 0; i < productFields.length; i++) {
                    _this.setProductField(product, productFields[i]);
                }
                console.log(product);
                _this.productSelectionChanged(product);
            };
            _this.onViewLoad = function () {
                _this.products = [];
                _this.productsSelect =
                    document.getElementById('admin-product-list');
                _this.productManager.fetch().then(function (products) {
                    for (var i = 0; i < products.length; i++) {
                        var product = products[i];
                        _this.products[product.getId()] = product;
                        _this.addProductOption(product);
                    }
                });
                _this.categories = [];
                _this.categoriesSelect =
                    document.getElementById('admin-product-category-list');
                _this.categoryManager.fetch().then(function (categories) {
                    for (var i = 0; i < categories.length; i++) {
                        var category = categories[i];
                        _this.categories[category.getId()] = category;
                        _this.addCategoryOption(category);
                    }
                });
            };
            _this.saveProduct = function () {
                var form = _this.getForm();
                _this.productManager.save(form).then(function (p) {
                    _this.addProductOption(p);
                    _this.output.write('Product is opgeslagen.');
                });
            };
            _this.deleteProduct = function () {
                var id = parseInt(_this.productsSelect.value);
                if (id === 0) {
                    return;
                }
                _this.productManager.delete(id).then(function (p) {
                    _this.htmlHelper.deleteSelectOption(_this.productsSelect);
                    _this.output.write('Product is verwijderd.');
                });
            };
            return _this;
        }
        __decorate([
            view_1.callback()
        ], ProductsView.prototype, "loadProductFields", void 0);
        __decorate([
            view_1.onLoad()
        ], ProductsView.prototype, "onViewLoad", void 0);
        __decorate([
            view_1.callback()
        ], ProductsView.prototype, "saveProduct", void 0);
        __decorate([
            view_1.callback()
        ], ProductsView.prototype, "deleteProduct", void 0);
        ProductsView = __decorate([
            __param(0, di_1.inject(productManager_1.ProductManager)),
            __param(1, di_1.inject(categoryManager_1.CategoryManager)),
            __param(2, di_1.inject(htmlHelper_1.HTMLHelper)),
            __param(3, di_1.inject(output_1.Output))
        ], ProductsView);
        return ProductsView;
    }(view_2.PageView));
    exports.ProductsView = ProductsView;
});
//# sourceMappingURL=productsView.js.map