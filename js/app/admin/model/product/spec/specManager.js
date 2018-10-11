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
define(["require", "exports", "core/http", "../../genericModelManager", "./specFactory", "lib/di"], function (require, exports, http_1, genericModelManager_1, specFactory_1, di_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SpecManager = /** @class */ (function (_super) {
        __extends(SpecManager, _super);
        function SpecManager(requestHandler, specFactory) {
            return _super.call(this, requestHandler, specFactory, 'admin/product') || this;
        }
        SpecManager = __decorate([
            di_1.singleton(),
            __param(0, di_1.inject(http_1.XHRequestHandler)),
            __param(1, di_1.inject(specFactory_1.SpecFactory))
        ], SpecManager);
        return SpecManager;
    }(genericModelManager_1.GenericModelManager));
    exports.SpecManager = SpecManager;
});
//# sourceMappingURL=specManager.js.map