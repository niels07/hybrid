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
define(["require", "exports", "core/http", "core/view", "lib/di", "app/admin/model/store/storeManager", "app/admin/io/output", "app/admin/html/htmlHelper"], function (require, exports, http_1, view_1, di_1, storeManager_1, output_1, htmlHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StoresView = /** @class */ (function (_super) {
        __extends(StoresView, _super);
        function StoresView(requestHandler, storeManager, output, htmlHelper) {
            var _this = _super.call(this, 'admin/stores') || this;
            _this.requestHandler = requestHandler;
            _this.storeManager = storeManager;
            _this.output = output;
            _this.htmlHelper = htmlHelper;
            _this.addStoreOption = function (store) {
                var opt = _this.htmlHelper.createSelectOption('store', store.getId(), store.getName());
                _this.storesSelect.add(opt);
            };
            _this.setField = function (name, value) {
                var elName = 'admin-store-' + name;
                var el = document.getElementById(elName);
                if (el) {
                    el.value = value;
                }
            };
            _this.clearDayFields = function () {
                var elements = document.getElementsByClassName('store-day');
                var days = [];
                for (var i = 0; i < elements.length; i++) {
                    var el = elements[i];
                    el.querySelector('.day-open').value = '';
                    el.querySelector('.day-closed').value = '';
                }
                _this.setField('days', '');
            };
            _this.clearFields = function () {
                _this.setField('name', '');
                _this.setField('street', '');
                _this.setField('street_number', '');
                _this.setField('zipcode', '');
                _this.setField('phone', '');
                _this.setField('country', '');
                _this.setField('city', '');
                _this.setField('email', '');
            };
            _this.loadStoreFields = function () {
                var storeId = parseInt(_this.storesSelect.value);
                _this.clearDayFields();
                if (storeId == 0) {
                    _this.clearFields();
                    return;
                }
                var store = _this.stores[storeId];
                _this.setField('name', store.getName());
                _this.setField('street', store.getStreet());
                _this.setField('street_number', store.getStreetNumber());
                _this.setField('zipcode', store.getZipcode());
                _this.setField('phone', store.getPhone());
                _this.setField('country', store.getCountry());
                _this.setField('city', store.getCity());
                _this.setField('email', store.getEmail());
                var days = store.getDays();
                _this.setField('days', JSON.stringify(days));
                for (var i = 0; i < days.length; i++) {
                    var day = days[i];
                    _this.setField("day-" + day['name'] + "-open", day['open']);
                    _this.setField("day-" + day['name'] + "-closed", day['closed']);
                }
            };
            _this.getForm = function () {
                return document.getElementById('admin-store-form');
            };
            _this.setStoreOption = function (store) {
                var id = store.getId();
                var name = store.getName();
                var opt = document.getElementById('store-' + id);
                if (opt) {
                    opt.value = id.toString();
                    opt.text = name;
                }
                else {
                    _this.addStoreOption(store);
                }
            };
            _this.onViewLoad = function () {
                _this.storesSelect = document.getElementById('admin-store-list');
                _this.storeManager.fetch().then(function (stores) {
                    _this.stores = {};
                    for (var i = 0; i < stores.length; i++) {
                        var store = stores[i];
                        _this.addStoreOption(store);
                        _this.stores[store.getId()] = store;
                    }
                });
            };
            _this.updateDays = function () {
                var elements = document.getElementsByClassName('store-day');
                var days = [];
                for (var i = 0; i < elements.length; i++) {
                    var el = elements[i];
                    var timeOpen = el.querySelector('.day-open').value;
                    var timeClosed = el.querySelector('.day-closed').value;
                    var dayName = el.querySelector('.day-name').value;
                    if (!timeOpen || !timeClosed) {
                        continue;
                    }
                    var day = {
                        'name': dayName,
                        'open': timeOpen,
                        'closed': timeClosed
                    };
                    days.push(day);
                }
                _this.setField('days', JSON.stringify(days));
            };
            _this.saveStore = function () {
                _this.updateDays();
                var form = _this.getForm();
                _this.storeManager.save(form).then(function (s) {
                    _this.setStoreOption(s);
                    _this.output.write('Filiaal is opgeslagen.');
                });
            };
            _this.deleteStore = function () {
                var id = parseInt(_this.storesSelect.value);
                if (id == 0) {
                    return;
                }
                _this.storeManager.delete(id).then(function (s) {
                    var opt = document.getElementById('store-' + id);
                    if (opt) {
                        _this.storesSelect.removeChild(opt);
                    }
                    _this.output.write('Filiaal is verwijderd.');
                });
            };
            return _this;
        }
        __decorate([
            view_1.callback()
        ], StoresView.prototype, "loadStoreFields", void 0);
        __decorate([
            view_1.onLoad()
        ], StoresView.prototype, "onViewLoad", void 0);
        __decorate([
            view_1.callback()
        ], StoresView.prototype, "saveStore", void 0);
        __decorate([
            view_1.callback()
        ], StoresView.prototype, "deleteStore", void 0);
        StoresView = __decorate([
            __param(0, di_1.inject(http_1.XHRequestHandler)),
            __param(1, di_1.inject(storeManager_1.StoreManager)),
            __param(2, di_1.inject(output_1.Output)),
            __param(3, di_1.inject(htmlHelper_1.HTMLHelper))
        ], StoresView);
        return StoresView;
    }(view_1.PageView));
    exports.StoresView = StoresView;
});
//# sourceMappingURL=storesView.js.map