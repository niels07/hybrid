var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "lib/di"], function (require, exports, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var StoreModel = /** @class */ (function () {
        function StoreModel(id, name, street, streetNumber, zipcode, city, country, phone, email, days) {
            var _this = this;
            this.id = id;
            this.name = name;
            this.street = street;
            this.streetNumber = streetNumber;
            this.zipcode = zipcode;
            this.city = city;
            this.country = country;
            this.phone = phone;
            this.email = email;
            this.days = days;
            this.getId = function () {
                return _this.id;
            };
            this.getName = function () {
                return _this.name;
            };
            this.getStreet = function () {
                return _this.street;
            };
            this.getStreetNumber = function () {
                return _this.streetNumber;
            };
            this.getCity = function () {
                return _this.city;
            };
            this.getZipcode = function () {
                return _this.zipcode;
            };
            this.getCountry = function () {
                return _this.country;
            };
            this.getPhone = function () {
                return _this.phone;
            };
            this.getEmail = function () {
                return _this.email;
            };
            this.getDays = function () {
                return _this.days;
            };
        }
        StoreModel = __decorate([
            di_1.service()
        ], StoreModel);
        return StoreModel;
    }());
    exports.StoreModel = StoreModel;
});
//# sourceMappingURL=storeModel.js.map