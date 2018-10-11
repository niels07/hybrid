var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "core/http", "lib/di", "./categoryFactory"], function (require, exports, http_1, di_1, categoryFactory_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CategoryManager = /** @class */ (function () {
        function CategoryManager(requestHandler, categoryFactory) {
            var _this = this;
            this.requestHandler = requestHandler;
            this.categoryFactory = categoryFactory;
            this.save = function (data) {
                return _this.requestHandler.sendRequest({
                    route: 'admin/category',
                    action: 'save',
                    data: data
                }).then(function (r) {
                    var item = r.getData('item');
                    var category = _this.categoryFactory.create(item);
                    return category;
                }, function (e) {
                    throw Error('failed to save item: ' + e);
                });
            };
            this.delete = function (id) {
                return _this.requestHandler.sendRequest({
                    route: 'admin/category',
                    action: 'delete',
                    data: { 'id': id }
                }).then(function (r) {
                    var data = r['data']['item'];
                    var category = _this.categoryFactory.create(data);
                    return category;
                }, function (e) {
                    throw Error('could not delete item: ' + e);
                });
            };
            this.fetch = function () {
                return _this.requestHandler.sendRequest({
                    route: 'admin/category',
                    action: 'getAll',
                    data: {},
                }).then(function (r) {
                    var data = r['data']['items'];
                    var categories = new Array();
                    for (var i = 0; i < data.length; i++) {
                        var category = _this.categoryFactory.create(data[i]);
                        categories.push(category);
                    }
                    return categories;
                }, function (e) {
                    throw Error('failed to fetch items: ' + e);
                });
            };
        }
        CategoryManager = __decorate([
            di_1.singleton(),
            __param(0, di_1.inject(http_1.XHRequestHandler)),
            __param(1, di_1.inject(categoryFactory_1.CategoryFactory))
        ], CategoryManager);
        return CategoryManager;
    }());
    exports.CategoryManager = CategoryManager;
});
//# sourceMappingURL=categoryManager.js.map