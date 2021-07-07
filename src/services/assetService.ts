import WebSocket from 'ws';
import { Asset, Coordinates } from '../models/asset';
import { Client, ConnectedClient } from '../models/client';
import AssetRepo from '../repositories/assetRepo';
import DistanceHelper from '../helpers/distance';


let assetRepo = AssetRepo.getInstance();

export async function getAssetById(id:string) {
  return await assetRepo.getAssetById(id);
}

export async function getAllAsset() {
    return await assetRepo.getAllAsset();
}

export async function getAllConnectedClient() {
  return await assetRepo.getAllConnectedClient();
}

export async function updateAssetPosition(assetId: string, coordinates: Coordinates) {
  return await assetRepo.updateAssetPosition(assetId, coordinates);
}

export async function resetAssetData() {
  return await assetRepo.resetAssetData();
}

export async function addClientToTrackedAsset(id: string, connectedClient: ConnectedClient) {
  return await assetRepo.addClientToTrackedAsset(id, connectedClient);
}

export async function removeClientFromTrackedAsset(id: string) {
  return await assetRepo.removeClientFromTrackedAsset(id);
}

export async function addClientToConnectedClients(id: string, ws: WebSocket) {
  return await assetRepo.addClientToConnectedClients(id, ws);
}

export async function removeClientFromConnectedClients(id: string) {
  return await assetRepo.removeClientFromConnectedClients(id);
}

export async function notifyClientsOfTrackAsset() {
  setInterval(async () => {
    const trackedAssets = await assetRepo.getAllTrackedAsset();
    console.log('sending every 5, asset tracked: ', trackedAssets.length)
    trackedAssets.forEach(async trackedAsset => {
      // console.log(trackedAsset)
      const connectedClientWS = await assetRepo.getConnectedClient(trackedAsset.client?.id)
      const asset = await assetRepo.getAssetById(trackedAsset?.assetId);
      const distance = Math.round(DistanceHelper.calcCrow(asset?.position?.lat || 0, asset?.position?.long || 0,
            trackedAsset?.client?.coordinate?.lat || 0, trackedAsset?.client?.coordinate?.long || 0) * 1000);
             if((distance <= 100 && distance >= 0 ) && (distance % 10 == 0)){
                 connectedClientWS?.send(`asset is ${distance} meters away`);
             } else{
                 connectedClientWS?.send(JSON.stringify({ id: asset?.id, location: `${asset?.position?.lat}, ${asset?.position?.long}`}));
             }
       })
 }, 5000)
}