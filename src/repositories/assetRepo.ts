import { Asset, Coordinates } from "../models/asset";
import { ConnectedClient } from "../models/client";

export default class AssetRepo {
    private static instance: AssetRepo;

    private assets: Asset[] = [
        { "id": "1", "name": "asset-1", "position": {"lat": 6.556961, "long": 3.329431} },
        { "id": "2", "name": "asset-2", "position": {"lat": 6.4914631, "long": 3.3570207} },
        { "id": "3", "name": "asset-3", "position": {"lat": 6.4914631, "long": 3.3570207} }
    ];
    private connectedClients: ConnectedClient[] = [];

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

    getAssetById(id: string) {
        return this.assets.find(a => a.id == id);
    }

    getAllAsset() {
        return this.assets;
    }
    
    getAllConnectedClient() {
      return this.connectedClients;
    }
    
    updateAssetPosition(assetId: string, coordinates: Coordinates) {
      const assetIndex = this.assets.findIndex(a => a.id == assetId);
      if(assetIndex >= 0) this.assets[assetIndex] = { ...this.assets[assetIndex], position: coordinates }
    }

    addClientToAssetClients(id: string, connectedClient: ConnectedClient) {
        const existingClientIndex = this.connectedClients.findIndex(c => c?.client.id === id);
        connectedClient.client.id = id;
        console.log('coordoordd', connectedClient.client)
        if(existingClientIndex >= 0) this.connectedClients[existingClientIndex] = connectedClient;
        else this.connectedClients.push(connectedClient);
        return connectedClient.assetId;
    }

    removeClientFromAssetClients(id: string) {
        const index = this.connectedClients.findIndex(c => c.client.id == id);
        if(index >= 0) this.connectedClients.splice(index, 1);
    }
}