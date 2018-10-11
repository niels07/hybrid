define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var GenericModelManager = /** @class */ (function () {
        function GenericModelManager(requestHandler, modelFactory, requestRoute) {
            var _this = this;
            this.requestHandler = requestHandler;
            this.modelFactory = modelFactory;
            this.requestRoute = requestRoute;
            this.error = function (message, response) {
                var error = response.getError();
                if (error) {
                    message += ': ' + error;
                }
                throw Error(message);
            };
            this.save = function (data) {
                return _this.requestHandler.sendRequest({
                    route: _this.requestRoute,
                    action: 'save',
                    data: data,
                }).then(function (r) {
                    var data = r.getData('item');
                    var model = _this.modelFactory.create(data);
                    return model;
                }, function (r) {
                    _this.error('failed to save item', r);
                });
            };
            this.delete = function (id) {
                return _this.requestHandler.sendRequest({
                    route: _this.requestRoute,
                    action: 'delete',
                    data: { 'id': id }
                }).then(function (r) {
                    var data = r.getData('item');
                    var category = _this.modelFactory.create(data);
                    return category;
                }, function (r) {
                    _this.error('could not delete item', r);
                });
            };
            this.fetch = function () {
                return _this.requestHandler.sendRequest({
                    route: _this.requestRoute,
                    action: 'getAll',
                    data: {}
                }).then(function (r) {
                    var data = r.getData('items');
                    var items = new Array();
                    for (var i = 0; i < data.length; i++) {
                        var item = _this.modelFactory.create(data[i]);
                        items.push(item);
                    }
                    return items;
                }, function (r) {
                    _this.error('failed to fetch items', r);
                });
            };
        }
        return GenericModelManager;
    }());
    exports.GenericModelManager = GenericModelManager;
});
//# sourceMappingURL=genericModelManager.js.map