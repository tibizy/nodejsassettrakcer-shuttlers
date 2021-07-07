'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var AssetService = __importStar(require("./services/assetService"));
function wsSetup(server, config) {
    var wss = new ws_1.default.Server({ server: server });
    var getUniqueID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    };
    wss.on('connection', function (ws, req) {
        var wsId = getUniqueID();
        AssetService.addClientToConnectedClients(wsId, ws);
        AssetService.getAllConnectedClient().then(function (clients) {
            console.log(wsId, " user connected via Websocket", clients.length, wss.clients.size);
        });
        ws.on('message', function (message) {
            console.log(wsId, message);
            //message request format: { event: EVENT_NAME, data: <any arbitrary data>}; message response format: { status: "ok"|"error", event: EVENT_NAME, data: <any arbitrar
            var parsedMessage = JSON.parse(message);
            if (parsedMessage.event == "TRACK_ASSET") {
                var asset = AssetService.addClientToTrackedAsset(wsId, parsedMessage.data);
                //  ws.send(`connected user ${wsId} tracking asset -> ${asset}`)
            }
        });
        //send immediatly a feedback to the incoming connection    
        ws.send('Hi there, I am a WebSocket server');
        ws.on('close', function (ws, req) {
            console.log(wsId, " user connection closed");
            AssetService.removeClientFromConnectedClients(wsId);
        });
    });
    AssetService.notifyClientsOfTrackAsset();
}
exports.default = wsSetup;
