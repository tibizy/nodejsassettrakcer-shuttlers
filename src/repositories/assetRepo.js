"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AssetRepo = /** @class */ (function () {
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    function AssetRepo() {
        this.assets = this.getAssets();
        this.connectedClients = {};
        this.assetsTracked = {};
    }
    ;
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    AssetRepo.getInstance = function () {
        if (!AssetRepo.instance) {
            AssetRepo.instance = new AssetRepo();
        }
        return AssetRepo.instance;
    };
    AssetRepo.prototype.getAssetById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.assets.find(function (a) { return a.id == id; })];
            });
        });
    };
    AssetRepo.prototype.getAllAsset = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.assets];
            });
        });
    };
    AssetRepo.prototype.getAllConnectedClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clients;
            var _this = this;
            return __generator(this, function (_a) {
                clients = [];
                Object.keys(this.connectedClients).forEach(function (a) {
                    var _a;
                    return clients.push((_a = {}, _a[a] = _this.connectedClients[a], _a));
                });
                return [2 /*return*/, clients];
            });
        });
    };
    AssetRepo.prototype.updateAssetPosition = function (assetId, coordinates) {
        return __awaiter(this, void 0, void 0, function () {
            var assetIndex;
            return __generator(this, function (_a) {
                assetIndex = this.assets.findIndex(function (a) { return a.id == assetId; });
                if (assetIndex >= 0)
                    this.assets[assetIndex] = __assign(__assign({}, this.assets[assetIndex]), { position: coordinates });
                return [2 /*return*/];
            });
        });
    };
    AssetRepo.prototype.resetAssetData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.assets = this.getAssets();
                return [2 /*return*/];
            });
        });
    };
    AssetRepo.prototype.getAllTrackedAsset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var assets;
            var _this = this;
            return __generator(this, function (_a) {
                assets = [];
                Object.keys(this.assetsTracked).forEach(function (a) { return assets.push(_this.assetsTracked[a]); });
                return [2 /*return*/, assets];
            });
        });
    };
    AssetRepo.prototype.addClientToTrackedAsset = function (id, connectedClient) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                connectedClient.client.id = id;
                this.assetsTracked[id] = connectedClient;
                return [2 /*return*/, this.assetsTracked[id]];
            });
        });
    };
    AssetRepo.prototype.removeClientFromTrackedAsset = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                delete this.assetsTracked[id];
                return [2 /*return*/];
            });
        });
    };
    AssetRepo.prototype.getConnectedClient = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.connectedClients[id]];
            });
        });
    };
    AssetRepo.prototype.addClientToConnectedClients = function (id, ws) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.connectedClients[id] = ws;
                return [2 /*return*/, this.connectedClients[id]];
            });
        });
    };
    AssetRepo.prototype.removeClientFromConnectedClients = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                delete this.connectedClients[id];
                delete this.assetsTracked[id];
                return [2 /*return*/];
            });
        });
    };
    AssetRepo.prototype.getAssets = function () {
        return [
            { "id": "1", "name": "asset-1", "position": { "lat": 6.4764224, "long": 3.3682224 } },
            { "id": "2", "name": "asset-2", "position": { "lat": 6.4914631, "long": 3.3570207 } },
            { "id": "3", "name": "asset-3", "position": { "lat": 6.4914631, "long": 3.3570207 } }
        ];
    };
    return AssetRepo;
}());
exports.default = AssetRepo;
