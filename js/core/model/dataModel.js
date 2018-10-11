define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var DataModel = /** @class */ (function () {
        function DataModel(data) {
            if (!data) {
                data = {};
            }
            this.data = data;
            for (var i in data) {
                this[i] = data[i];
            }
        }
        DataModel.prototype.toJson = function () {
            return JSON.stringify(this.data);
        };
        return DataModel;
    }());
    exports.DataModel = DataModel;
});
//# sourceMappingURL=dataModel.js.map