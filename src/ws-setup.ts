'use strict';
import WebSocket from 'ws';
import * as http from 'http';
import * as AssetService from './services/assetService';

export default function wsSetup(server: any, config: any) {

    const wss = new WebSocket.Server({ server });
    const getUniqueID = function () {
       function s4() {
           return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
       }
       return s4() + s4() + '-' + s4();
    };
    
    wss.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
       const wsId = getUniqueID();
       AssetService.addClientToConnectedClients(wsId, ws);
       AssetService.getAllConnectedClient().then(clients => {
         console.log(wsId, " user connected via Websocket", clients.length, wss.clients.size)
       })
       ws.on('message', (message: string) => {
         console.log(wsId, message)
         //message request format: { event: EVENT_NAME, data: <any arbitrary data>}; message response format: { status: "ok"|"error", event: EVENT_NAME, data: <any arbitrar
    
          const parsedMessage: { event: string, data: any } = JSON.parse(message)
          if(parsedMessage.event == "TRACK_ASSET") {
             const asset = AssetService.addClientToTrackedAsset(wsId, parsedMessage.data);
            //  ws.send(`connected user ${wsId} tracking asset -> ${asset}`)
          }
       });
    
       //send immediatly a feedback to the incoming connection    
       ws.send('Hi there, I am a WebSocket server');
    
       ws.on('close', (ws: WebSocket, req: http.IncomingMessage) => {
          console.log(wsId, " user connection closed")
          AssetService.removeClientFromConnectedClients(wsId);
       })
    });
    
    AssetService.notifyClientsOfTrackAsset();
}