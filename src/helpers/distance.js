"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcCrow = void 0;
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}
exports.calcCrow = calcCrow;
// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}
var DistanceHelper = /** @class */ (function () {
    function DistanceHelper() {
    }
    DistanceHelper.calcCrow = calcCrow;
    return DistanceHelper;
}());
exports.default = DistanceHelper;
