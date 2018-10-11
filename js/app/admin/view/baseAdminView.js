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
define(["require", "exports", "core/view"], function (require, exports, view_1) {
    "use strict";
    exports.__esModule = true;
    var BaseAdminView = /** @class */ (function (_super) {
        __extends(BaseAdminView, _super);
        function BaseAdminView(name, requestHandler, viewManager) {
            var _this = _super.call(this, name) || this;
            _this.requestHandler = requestHandler;
            _this.viewManager = viewManager;
            _this.createSelectOption = function (type, id, text) {
                var opt = document.createElement('option');
                opt.value = id;
                opt.id = type + "-" + id;
                opt.text = text;
                return opt;
            };
            _this.loadFields = function () {
                var elements = _this.getForm().elements;
                _this.fields = {};
                for (var i = 0; i < elements.length; i++) {
                    var el = elements[i];
                    _this.addElement(el);
                }
            };
            _this.getFields = function () {
                if (!_this.fields) {
                    _this.loadFields();
                }
                return _this.fields;
            };
            _this.setValue = function (field, value) {
                var tagName = field.tagName.toLowerCase();
                var el;
                if (tagName == 'textarea') {
                    el = field;
                    el.value = value;
                    return;
                }
                if (tagName != 'input') {
                    return;
                }
                el = field;
                var type = el.type.toLowerCase();
                if (type == 'number' || type == 'text' || type == 'hidden') {
                    el.value = value;
                }
            };
            _this.clear = function () {
                var fields = _this.getFields();
                for (var i in fields) {
                    var field = fields[i];
                    _this.setValue(field, '');
                }
            };
            _this.setField = function (name, value) {
                var fields = _this.getFields();
                if (!(name in fields)) {
                    return;
                }
                var field = fields[name];
                _this.setValue(field, value);
            };
            _this.showMessage = function (message) {
                var overlay = document.createElement('div');
                overlay.className = 'overlay';
                var popup = document.createElement('div');
                popup.className = 'popup';
                var button = document.createElement('button');
                button.onclick = function () {
                    popup.parentNode.removeChild(popup);
                    overlay.parentNode.removeChild(overlay);
                };
                button.innerHTML = 'OK';
                var text = document.createTextNode(message);
                popup.appendChild(text);
                popup.appendChild(button);
                overlay.appendChild(popup);
                document.body.appendChild(overlay);
                window.scrollTo(0, 0);
            };
            _this.imageUpload = function (fileInput, onLoad) {
                if (onLoad === void 0) { onLoad = null; }
                _this.requestHandler.sendRequest({
                    route: 'uploadImage',
                    action: 'uploadImage',
                    data: {
                        image: fileInput.files[0],
                        name: fileInput.value
                    },
                    onLoad: function (r) {
                        var url = r.getData('url');
                        if (onLoad) {
                            onLoad(url);
                        }
                        _this.showMessage("Afbeelding is geupload: " + url);
                    },
                    onError: function (response) {
                        _this.showMessage('Kon afbeelding niet uploaden.');
                    }
                });
            };
            return _this;
        }
        BaseAdminView.prototype.addElement = function (el) {
            if (typeof el !== 'object' || !el.hasAttributes()) {
                return;
            }
            var attrs = el.attributes;
            if (!('name' in attrs)) {
                return;
            }
            var name = attrs['name'].value;
            this.fields[name] = el;
        };
        return BaseAdminView;
    }(view_1.PageView));
    exports.BaseAdminView = BaseAdminView;
});
//# sourceMappingURL=baseAdminView.js.map