import WebSocket from 'ws';
import { Asset, Coordinates } from "../models/asset";
import { ConnectedClient } from "../models/client";

export default class AssetRepo {
    private static instance: AssetRepo;

    private assets: Asset[] = this.getAssets();;
    private connectedClients: any = {};
    private assetsTracked: any = {};

    /**
     * The Singleton's constructor should always be private to prevent direct
     * construction calls with the `new` operator.
     */
    private constructor() { }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    public static getInstance(): AssetRepo {
        if (!AssetRepo.instance) {
            AssetRepo.instance = new AssetRepo();
        }

        return AssetRepo.instance;
    }

    async getAssetById(id: string) {
        return this.assets.find(a => a.id == id);
    }

    async getAllAsset() {
        return this.assets;
    }
    
    async getAllConnectedClient() {
        const clients: any[] = [];
        Object.keys(this.connectedClients).forEach(a => clients.push({[a]: this.connectedClients[a]}));
        return clients;
    }
    
    async updateAssetPosition(assetId: string, coordinates: Coordinates) {
      const assetIndex = this.assets.findIndex(a => a.id == assetId);
      if(assetIndex >= 0) this.assets[assetIndex] = { ...this.assets[assetIndex], position: coordinates }
    }
    
    async resetAssetData() {
        this.assets = this.getAssets();
      }
      
    async getAllTrackedAsset() {
        const assets: any[] = [];
        Object.keys(this.assetsTracked).forEach(a => assets.push(this.assetsTracked[a]));
        return assets;
    }

    async addClientToTrackedAsset(id: string, connectedClient: ConnectedClient) {
        connectedClient.client.id = id;
        this.assetsTracked[id] = connectedClient;
        return this.assetsTracked[id];
    }

    async removeClientFromTrackedAsset(id: string) {
        delete this.assetsTracked[id];
    }

    async getConnectedClient(id: string) {
        return this.connectedClients[id];
    }

    async addClientToConnectedClients(id: string, ws: WebSocket) {
        this.connectedClients[id] = ws;
        return this.connectedClients[id];
    }

    async removeClientFromConnectedClients(id: string) {
        delete this.connectedClients[id];
        delete this.assetsTracked[id];
    }

    getAssets() {
        return [
            { "id": "1", "name": "asset-1", "position": {"lat": 6.4764224, "long": 3.3682224} }, //6.4774138, 3.3676215 
            { "id": "2", "name": "asset-2", "position": {"lat": 6.4914631, "long": 3.3570207} },
            { "id": "3", "name": "asset-3", "position": {"lat": 6.4914631, "long": 3.3570207} }
        ]
    }
}