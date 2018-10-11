var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", "./xhRequestFactory", "./xhResponseFactory", "./xhResponseStatus", "lib/di", "core/promise"], function (require, exports, xhRequestFactory_1, xhResponseFactory_1, xhResponseStatus_1, di_1, promise_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var XHRequestHandler = /** @class */ (function () {
        function XHRequestHandler(requestFactory, responseFactory, promiseFactory) {
            var _this = this;
            this.requestFactory = requestFactory;
            this.responseFactory = responseFactory;
            this.promiseFactory = promiseFactory;
            this.loadingThreshold = 1000;
            this.getRequestString = function (route, action, data) {
                var requestStr = "route=" + route + "&action=" + action;
                for (var arg in data) {
                    requestStr += "&" + arg + "=" + data[arg];
                }
                return requestStr;
            };
            this.loadObject = function (formData, obj) {
                var data = {};
                for (var i in obj) {
                    var item = obj[i];
                    if (item instanceof Blob) {
                        formData.append(i, item);
                    }
                    else {
                        data[i] = item;
                    }
                }
                var dataStr = JSON.stringify(data);
                formData.append('data', dataStr);
            };
            this.loadForm = function (formData, form) {
                var result = null;
                var items = form.elements;
                var data = {};
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    var tagName = item.tagName.toLowerCase();
                    if ((tagName == 'select' || tagName == 'input' || tagName == 'textarea') && 'name' in item) {
                        var name = item['name'];
                        data[item['name']] = item['value'];
                        continue;
                    }
                    if (tagName != 'file') {
                        continue;
                    }
                    var fileInput = item;
                    if (!fileInput.files || fileInput.files.length == 0) {
                        continue;
                    }
                    var file = fileInput.files[0];
                    formData.append(fileInput.name, file);
                }
                var dataStr = JSON.stringify(data);
                formData.append('data', JSON.stringify(data));
            };
            this.isForm = function (data) {
                return data
                    && 'tagName' in data
                    && data['tagName'].toLowerCase() === 'form';
            };
            this.loadRequestData = function (formData, data) {
                if (_this.isForm(data)) {
                    _this.loadForm(formData, data);
                }
                else {
                    _this.loadObject(formData, data);
                }
            };
            this.prepareRequest = function (route, action, data) {
                var formData = new FormData();
                if (data) {
                    _this.loadRequestData(formData, data);
                }
                formData.append('route', route);
                formData.append('action', action);
                formData.append('isXHR', 'true');
                return formData;
            };
            this.parseData = function (dataStr) {
                var data;
                try {
                    data = JSON.parse(dataStr);
                }
                catch (_a) {
                    return dataStr;
                }
                if (typeof (data) in ['string', 'number']) {
                    return data;
                }
                for (var key in data) {
                    var value = data[key];
                    try {
                        value = JSON.parse(value);
                        data[key] = value;
                    }
                    catch (_b) { }
                }
                return data;
            };
            this.getResponse = function (xhr) {
                var responseStr = xhr.getResponse();
                if (!responseStr) {
                    return _this.responseFactory.create();
                }
                var responseObj;
                try {
                    responseObj = JSON.parse(responseStr);
                }
                catch (e) {
                    throw Error('received invalid response: ' + responseStr);
                }
                var data;
                var status = xhResponseStatus_1.XHResponseStatus.Success;
                if ('data' in responseObj) {
                    data = _this.parseData(responseObj['data']);
                }
                var error = responseObj['error'];
                return _this.responseFactory.create(data, error);
            };
            this.sendRequest = function (args) {
                if (!args.path) {
                    args.path = 'index.php';
                }
                var xhr = _this.requestFactory.create(args.path, args.method);
                var timeout = setTimeout(function () {
                    document.body.classList.add('loading');
                }, _this.loadingThreshold);
                return _this.promiseFactory.create(function (resolve, reject) {
                    var onLoad = function () {
                        clearTimeout(timeout);
                        document.body.classList.remove('loading');
                        var response = _this.getResponse(xhr);
                        resolve(response);
                    };
                    var onError = function () {
                        clearTimeout(timeout);
                        document.body.classList.remove('loading');
                        var response = _this.responseFactory.create(xhr.getResponse());
                        reject(response.getError());
                    };
                    var data = _this.prepareRequest(args.route, args.action, args.data);
                    xhr.send(data, onLoad, onError);
                });
            };
        }
        XHRequestHandler.prototype.getRequest = function (key) {
            var url = location.href;
            key = key.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + key + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(url);
            return results == undefined ? undefined : results[1];
        };
        XHRequestHandler = __decorate([
            di_1.singleton(),
            __param(0, di_1.inject(xhRequestFactory_1.XHRequestFactory)),
            __param(1, di_1.inject(xhResponseFactory_1.XHResponseFactory)),
            __param(2, di_1.inject(promise_1.PromiseFactory))
        ], XHRequestHandler);
        return XHRequestHandler;
    }());
    exports.XHRequestHandler = XHRequestHandler;
});
//# sourceMappingURL=xhRequestHandler.js.map