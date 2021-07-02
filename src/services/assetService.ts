import { Asset, Coordinates } from '../models/asset';
import { Client, ConnectedClient } from '../models/client';
import AssetRepo from '../repositories/assetRepo';

let assets: Asset[] = [
  { "id": "1", "name": "asset-1", "position": {"lat": 6.556961, "long": 3.329431} },
  { "id": "2", "name": "asset-2", "position": {"lat": 6.4914631, "long": 3.3570207} },
  { "id": "3", "name": "asset-3", "position": {"lat": 6.4914631, "long": 3.3570207} }
];

let assetRepo = AssetRepo.getInstance();

export async function getAssetById(id:string) {
  return assetRepo.getAssetById(id);
}

export async function getAllAsset() {
    return assetRepo.getAllAsset();
}

export async function getAllConnectedClient() {
  return assetRepo.getAllConnectedClient();
}

export async function updateAssetPosition(assetId: string, coordinates: Coordinates) {
  return assetRepo.updateAssetPosition(assetId, coordinates);
}

export async function addClientToAssetClients(id: string, connectedClient: ConnectedClient) {
  return assetRepo.addClientToAssetClients(id, connectedClient);
}

export async function removeClientFromAssetClients(id: string) {
  return assetRepo.removeClientFromAssetClients(id);
}