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
Object.defineProperty(exports, "__esModule", { value: true });
var AssetRepo = /** @class */ (function () {
    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    function AssetRepo() {
        this.assets = [
            { "id": "1", "name": "asset-1", "position": { "lat": 6.556961, "long": 3.329431 } },
            { "id": "2", "name": "asset-2", "position": { "lat": 6.4914631, "long": 3.3570207 } },
            { "id": "3", "name": "asset-3", "position": { "lat": 6.4914631, "long": 3.3570207 } }
        ];
        this.connectedClients = [];
    }
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
        return this.assets.find(function (a) { return a.id == id; });
    };
    AssetRepo.prototype.getAllAsset = function () {
        return this.assets;
    };
    AssetRepo.prototype.getAllConnectedClient = function () {
        return this.connectedClients;
    };
    AssetRepo.prototype.updateAssetPosition = function (assetId, coordinates) {
        var assetIndex = this.assets.findIndex(function (a) { return a.id == assetId; });
        if (assetIndex >= 0)
            this.assets[assetIndex] = __assign(__assign({}, this.assets[assetIndex]), { position: coordinates });
    };
    AssetRepo.prototype.addClientToAssetClients = function (id, connectedClient) {
        var existingClientIndex = this.connectedClients.findIndex(function (c) { return (c === null || c === void 0 ? void 0 : c.client.id) === id; });
        connectedClient.client.id = id;
        console.log('coordoordd', connectedClient.client);
        if (existingClientIndex >= 0)
            this.connectedClients[existingClientIndex] = connectedClient;
        else
            this.connectedClients.push(connectedClient);
        return connectedClient.assetId;
    };
    AssetRepo.prototype.removeClientFromAssetClients = function (id) {
        var index = this.connectedClients.findIndex(function (c) { return c.client.id == id; });
        if (index >= 0)
            this.connectedClients.splice(index, 1);
    };
    return AssetRepo;
}());
exports.default = AssetRepo;
