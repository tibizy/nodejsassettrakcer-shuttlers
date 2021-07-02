'use strict';
import WebSocket from 'ws';
import * as http from 'http';
import * as AssetService from './services/assetService';
import DistanceHelper from './helpers/distance';

export default function wsSetup(server: any, config: any) {

    const wss = new WebSocket.Server({ server });
    const getUniqueID = function () {
       function s4() {
           return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
       }
       return s4() + s4() + '-' + s4();
    };
    const connectedClients: { id: string, ws: WebSocket }[] = [];
    
    wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
       const wsId = getUniqueID();
       connectedClients.push({ id: wsId, ws })
       console.log(wsId, " user connected via Websocket", connectedClients.length, wss.clients.size)
       //connection is up, let's add a simple simple event
       ws.on('message', (message: string) => {
          // message request format: { event: EVENT_NAME, data: <any arbitrary data> }
          // message response format: { status: "ok"|"error", event: EVENT_NAME, data: <any arbitrary data> }
    
          //log the received message and send it back to the client
          console.log('received: %s', message);
    
          const parsedMessage: { event: string, data: any } = JSON.parse(message)
          if(parsedMessage.event == "TRACK_ASSET") {
             AssetService.addClientToAssetClients(wsId, parsedMessage.data).then(res => {
                if(res){
                   ws.send(`connected user ${wsId} tracking asset -> ${res}`)
                }
             });
          }
       });
    
       //send immediatly a feedback to the incoming connection    
       ws.send('Hi there, I am a WebSocket server');
    
       ws.on('close', (ws: WebSocket, req: http.IncomingMessage) => {
          console.log(wsId, " user connection closed")
          const index = connectedClients.findIndex(c => c.id == wsId);
          if(index) connectedClients.splice(index, 1);
          AssetService.removeClientFromAssetClients(wsId);
       })
    });
    
    setInterval(() => {
       AssetService.getAllConnectedClient().then(res => {
          console.log('sending every 5, asset tracked: ', res.length)
          res.forEach(async client => {
             const connectedClientWS = connectedClients.find(c => c.id == client.client.id)
             const asset = await AssetService.getAssetById(client?.assetId);
             const distance = Math.round(DistanceHelper.calcCrow(asset?.position?.lat || 0, asset?.position?.long || 0,
                client?.client.coordinate?.lat || 0, client?.client.coordinate?.long || 0) * 1000);
                if((distance <= 100 && distance >= 0 ) && (distance % 10 == 0)){
                    connectedClientWS?.ws.send(`asset is ${distance} meters away`);
                } else{
                    connectedClientWS?.ws.send(JSON.stringify({ ...asset, distance: `distance: ${distance}`}));
                }
          })
       })
       connectedClients.forEach(client => client)
    }, 5000)
}