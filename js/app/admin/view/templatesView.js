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
define(["require", "exports", "core/http", "core/view", "lib/di", "core/view", "../io/output", "lib/html"], function (require, exports, http_1, view_1, di_1, view_2, output_1, html_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var TemplatesView = /** @class */ (function (_super) {
        __extends(TemplatesView, _super);
        function TemplatesView(requestHandler, tabControl, output) {
            var _this = _super.call(this, 'admin/templates') || this;
            _this.requestHandler = requestHandler;
            _this.tabControl = tabControl;
            _this.output = output;
            _this.getSelectedTemplate = function () {
                var select = document.getElementById('template-selection');
                return select.value;
            };
            _this.loadView = function () {
                require(['lib/ace/ace'], function () {
                    var editors = document.getElementById('editors');
                    if (!editors) {
                        return;
                    }
                    var w = window;
                    _this.tplEditor = w['ace'].edit('template-editor');
                    _this.tplEditor.session.setMode('ace/mode/php');
                    _this.cssEditor = w['ace'].edit('css-editor');
                    _this.cssEditor.session.setMode('ace/mode/less');
                    _this.loadTemplateContent();
                    _this.tabControl.init(editors);
                    _this.imgSelect = document.getElementById('image-selection');
                });
            };
            _this.addImageOption = function (src) {
                var opt = document.createElement('option');
                if (src) {
                    opt.text = src.replace(/^.*[\\\/]/, '');
                    opt.value = src;
                }
                else {
                    opt.value = '';
                    opt.text = '';
                }
                _this.imgSelect.add(opt);
            };
            _this.addImages = function (images) {
                _this.imgSelect.innerHTML = '';
                _this.addImageOption(undefined);
                if (!images || images.length == 0) {
                    return;
                }
                for (var i = 0; i < images.length; i++) {
                    var img = images[i];
                    _this.addImageOption(img);
                }
                _this.imgSelect.onchange = function () {
                    var preview = document.getElementById('image-preview');
                    if (!preview) {
                        return;
                    }
                    preview.innerHTML = '';
                    if (_this.imgSelect.value == '') {
                        return;
                    }
                    var img = document.createElement('img');
                    img.src = _this.imgSelect.value;
                    preview.appendChild(img);
                };
            };
            _this.loadTemplateContent = function () {
                var template = _this.getSelectedTemplate();
                _this.requestHandler.sendRequest({
                    'route': 'admin/template',
                    'action': 'getTemplate',
                    'data': { 'template': template }
                }).then(function (r) {
                    var data = r['data'];
                    _this.tplEditor.setValue(data['content'], -1);
                    _this.cssEditor.setValue(data['css'], -1);
                    _this.addImages(data['images']);
                });
            };
            _this.buildCss = function (css, onLoad) {
                require(['lib/less/less'], function (l) {
                    l.render(css, {
                        'rootpath': '/css/',
                    }, function (error, output) {
                        _this.requestHandler.sendRequest({
                            'route': 'admin/template',
                            'action': 'savePageCss',
                            'data': { 'css': output.css }
                        }).then(function (r) { return onLoad(r); });
                    });
                });
            };
            _this.uploadImage = function () {
                var input = document.getElementById('upload-image');
                if (!input || !input.files) {
                    return;
                }
                var tpl = _this.getSelectedTemplate();
                var img = input.files[0];
                var name = _this.getImageName(img);
                _this.requestHandler.sendRequest({
                    'route': 'admin/template',
                    'action': 'uploadImage',
                    'data': {
                        'template': tpl,
                        'image': img,
                        'name': name
                    },
                }).then(function (r) {
                    var imgPath = r.getData('path');
                    _this.addImageOption(imgPath);
                    _this.output.write('De afbeelding is geupload');
                }, function (e) {
                    var msg = 'Fout bij het uploaden van de afbeelding';
                    if (e) {
                        msg += ': ' + e;
                    }
                    _this.output.error(msg);
                });
            };
            _this.insertImage = function () {
                var idx = _this.imgSelect.selectedIndex;
                if (idx < 0) {
                    return;
                }
                var opt = _this.imgSelect.options[idx];
                if (opt.value == '') {
                    return;
                }
                var alt = opt.text.replace(/\.[^/.]+$/, '');
                var src = opt.value;
                var str = "<img src=\"" + src + "\" alt=\"" + alt + "\" />";
                _this.tplEditor.insert(str);
            };
            _this.saveTemplate = function () {
                var template = _this.getSelectedTemplate();
                var content = _this.tplEditor.getValue();
                var css = _this.cssEditor.getValue();
                _this.requestHandler.sendRequest({
                    'route': 'admin/template',
                    'action': 'saveTemplate',
                    'data': {
                        'template': template,
                        'content': content,
                        'css': css
                    }
                }).then(function (r) {
                    _this.buildCss(r['data']['css'], function (r) {
                        _this.output.write('Template is gewijzigd');
                    });
                }, function (e) {
                    _this.output.error('Fout bij het wijzigen van de template');
                });
            };
            return _this;
        }
        TemplatesView.prototype.getImageName = function (file) {
            var nameEl = document.getElementById('image-name');
            var name = nameEl.value.trim();
            return (name == '') ? file.name.replace(/\.[^/.]+$/, '') : name;
        };
        __decorate([
            view_1.onLoad()
        ], TemplatesView.prototype, "loadView", void 0);
        __decorate([
            view_1.callback()
        ], TemplatesView.prototype, "loadTemplateContent", void 0);
        __decorate([
            view_1.callback()
        ], TemplatesView.prototype, "uploadImage", void 0);
        __decorate([
            view_1.callback()
        ], TemplatesView.prototype, "insertImage", void 0);
        __decorate([
            view_1.callback()
        ], TemplatesView.prototype, "saveTemplate", void 0);
        TemplatesView = __decorate([
            __param(0, di_1.inject(http_1.XHRequestHandler)),
            __param(1, di_1.inject(html_1.TabControl)),
            __param(2, di_1.inject(output_1.Output))
        ], TemplatesView);
        return TemplatesView;
    }(view_2.PageView));
    exports.TemplatesView = TemplatesView;
});
//# sourceMappingURL=templatesView.js.map