define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var ModelCollection = /** @class */ (function () {
        function ModelCollection(name, requestHandler) {
            var _this = this;
            this.name = name;
            this.requestHandler = requestHandler;
            this.items = null;
            this.contains = function (name) {
                return name in _this.items;
            };
            this.get = function (name) {
                return _this.contains(name) ? _this.items[name] : null;
            };
            this.setOnLoad = function (onLoad) {
                _this.onLoad = onLoad;
            };
            this["delete"] = function (id, onDelete) {
                _this.requestHandler.sendRequest({
                    route: 'admin/' + _this.name,
                    action: 'delete',
                    data: { 'id': id },
                    onLoad: function (r) {
                        delete _this.items[id];
                        onDelete();
                    },
                    onError: function (response) {
                        throw _this.createErrorMsg('could not delete item', response);
                    }
                });
            };
            this.save = function (form, onSave) {
                _this.requestHandler.sendRequest({
                    route: 'admin/' + _this.name,
                    action: 'save',
                    data: form,
                    onLoad: function (r) {
                        var item = JSON.parse(r.getData('item'));
                        _this.set(item['id'], item);
                        onSave(item);
                    },
                    onError: function (r) {
                        throw new Error('failed to save item');
                    }
                });
            };
            this.loadItems = function (handler, items) {
                _this.items = {};
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var id = item['id'];
                    if (handler) {
                        handler(item);
                    }
                    _this.items[id] = item;
                }
            };
            this.setFilter = function (name, value) {
                if (_this.filter
                    && (_this.filter[0] !== name
                        || _this.filter[1] !== value)) {
                    _this.items = null;
                }
                _this.filter = [name, value];
            };
            this.each = function (handler) {
                if (_this.items !== null) {
                    _this.handleItems(handler);
                }
                else {
                    _this.fetchItems(handler);
                }
            };
        }
        ModelCollection.prototype.createErrorMsg = function (message, response) {
            if (!('errors' in response)) {
                return message;
            }
            var errors = response['errors'];
            var errorStr = errors.length > 1
                ? ('\n\t' + errors.join('\n\t'))
                : errors[0];
            return message + ": " + errorStr;
        };
        ModelCollection.prototype.set = function (name, item) {
            this.items[name] = item;
        };
        ModelCollection.prototype.handleItems = function (handler) {
            for (var i in this.items) {
                if (handler(this.items[i]) === false) {
                    break;
                }
            }
        };
        ModelCollection.prototype.fetchItems = function (handler) {
            var _this = this;
            var action;
            var data;
            if (this.filter) {
                action = 'getByField';
                data = {
                    'field': this.filter[0],
                    'value': this.filter[1]
                };
            }
            else {
                action = 'getAll';
                data = {};
            }
            this.requestHandler.sendRequest({
                route: 'admin/' + this.name,
                action: action,
                data: data,
                onLoad: function (response) {
                    var items = response.getData('items');
                    _this.loadItems(handler, items);
                    if (_this.onLoad) {
                        _this.onLoad();
                    }
                },
                onError: function (response) {
                    throw _this.createErrorMsg('failed to fetch items', response);
                }
            });
        };
        return ModelCollection;
    }());
    exports.ModelCollection = ModelCollection;
});
//# sourceMappingURL=modelCollection.js.map