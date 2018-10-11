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
define(["require", "exports", "core/http", "core/view", "../io/output", "lib/di", "core/view", "../model/category/categoryManager"], function (require, exports, http_1, view_1, output_1, di_1, view_2, categoryManager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CategoriesView = /** @class */ (function (_super) {
        __extends(CategoriesView, _super);
        function CategoriesView(requestHandler, categoryManager, output) {
            var _this = _super.call(this, 'admin/categories') || this;
            _this.requestHandler = requestHandler;
            _this.categoryManager = categoryManager;
            _this.output = output;
            _this.loadCategoryFields = function () {
                var nameField = document.getElementById('category-name-field');
                var tnField = document.getElementById('category-image-field');
                var id = parseInt(_this.categoriesSelect.value);
                if (id == 0) {
                    nameField.value = '';
                    tnField.value = '';
                }
                else {
                    var category = _this.categories[id];
                    nameField.value = category.getName();
                    tnField.value = category.getThumbNail();
                }
            };
            _this.getForm = function () {
                return document.getElementById('admin-category-form');
            };
            _this.addSelectOption = function (value, text) {
                var opt = document.createElement('option');
                opt.value = value;
                opt.text = text;
                _this.categoriesSelect.add(opt);
            };
            _this.addCategoryOption = function (category) {
                var id = category.getId().toString();
                var name = category.getName();
                _this.addSelectOption(id, name);
            };
            _this.addCategory = function (category) {
                _this.addCategoryOption(category);
                _this.categories[category.getId()] = category;
            };
            _this.onViewLoad = function () {
                _this.categoriesSelect = document.getElementById('admin-category-list');
                _this.categoryManager.fetch().then(function (categories) {
                    _this.categories = {};
                    _this.addSelectOption('0', 'Nieuwe Categorie');
                    for (var i = 0; i < categories.length; i++) {
                        _this.addCategory(categories[i]);
                    }
                });
            };
            _this.saveCategory = function () {
                var form = _this.getForm();
                _this.categoryManager.save(form).then(function (c) {
                    _this.addCategory(c);
                    _this.output.write('Categorie is opgeslagen.');
                });
            };
            _this.deleteCategory = function () {
                var id = parseInt(_this.categoriesSelect.value);
                if (id == 0) {
                    return;
                }
                _this.categoryManager.delete(id).then(function (c) {
                    var opt = _this.categoriesSelect.options[_this.categoriesSelect.selectedIndex];
                    _this.categoriesSelect.removeChild(opt);
                    delete _this.categories[id];
                    _this.output.write('Categorie is verwijderd.');
                });
            };
            _this.uploadImage = function () {
                var input = document.getElementById('category-image-upload');
                var categoryId = parseInt(_this.categoriesSelect.value);
                var img = input.files[0];
                _this.requestHandler.sendRequest({
                    'route': 'admin/category',
                    'action': 'uploadImage',
                    'data': { 'image': img },
                }).then(function (r) {
                    var tnField = document.getElementById('category-image-field');
                    tnField.value = r.getData('path');
                    _this.output.write('De afbeelding is geupload');
                }, function (e) {
                    var msg = 'Fout bij het uploaden van de afbeelding';
                    if (e) {
                        _this.output.error(msg + ": " + e);
                    }
                    else {
                        _this.output.error(msg);
                    }
                });
            };
            return _this;
        }
        __decorate([
            view_1.callback()
        ], CategoriesView.prototype, "loadCategoryFields", void 0);
        __decorate([
            view_1.onLoad()
        ], CategoriesView.prototype, "onViewLoad", void 0);
        __decorate([
            view_1.callback()
        ], CategoriesView.prototype, "saveCategory", void 0);
        __decorate([
            view_1.callback()
        ], CategoriesView.prototype, "deleteCategory", void 0);
        __decorate([
            view_1.callback()
        ], CategoriesView.prototype, "uploadImage", void 0);
        CategoriesView = __decorate([
            __param(0, di_1.inject(http_1.XHRequestHandler)),
            __param(1, di_1.inject(categoryManager_1.CategoryManager)),
            __param(2, di_1.inject(output_1.Output))
        ], CategoriesView);
        return CategoriesView;
    }(view_2.PageView));
    exports.CategoriesView = CategoriesView;
});
//# sourceMappingURL=categoriesView.js.map