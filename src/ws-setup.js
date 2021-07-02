'use strict';
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = __importDefault(require("ws"));
var AssetService = __importStar(require("./services/assetService"));
var distance_1 = __importDefault(require("./helpers/distance"));
function wsSetup(server, config) {
    var _this = this;
    var wss = new ws_1.default.Server({ server: server });
    var getUniqueID = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        }
        return s4() + s4() + '-' + s4();
    };
    var connectedClients = [];
    wss.on('connection', function (ws, req) {
        var wsId = getUniqueID();
        connectedClients.push({ id: wsId, ws: ws });
        console.log(wsId, " user connected via Websocket", connectedClients.length, wss.clients.size);
        //connection is up, let's add a simple simple event
        ws.on('message', function (message) {
            // message request format: { event: EVENT_NAME, data: <any arbitrary data> }
            // message response format: { status: "ok"|"error", event: EVENT_NAME, data: <any arbitrary data> }
            //log the received message and send it back to the client
            console.log('received: %s', message);
            var parsedMessage = JSON.parse(message);
            if (parsedMessage.event == "TRACK_ASSET") {
                AssetService.addClientToAssetClients(wsId, parsedMessage.data).then(function (res) {
                    if (res) {
                        ws.send("connected user " + wsId + " tracking asset -> " + res);
                    }
                });
            }
        });
        //send immediatly a feedback to the incoming connection    
        ws.send('Hi there, I am a WebSocket server');
        ws.on('close', function (ws, req) {
            console.log(wsId, " user connection closed");
            var index = connectedClients.findIndex(function (c) { return c.id == wsId; });
            if (index)
                connectedClients.splice(index, 1);
            AssetService.removeClientFromAssetClients(wsId);
        });
    });
    setInterval(function () {
        AssetService.getAllConnectedClient().then(function (res) {
            console.log('sending every 5, asset tracked: ', res.length);
            res.forEach(function (client) { return __awaiter(_this, void 0, void 0, function () {
                var connectedClientWS, asset, distance;
                var _a, _b, _c, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            connectedClientWS = connectedClients.find(function (c) { return c.id == client.client.id; });
                            return [4 /*yield*/, AssetService.getAssetById(client === null || client === void 0 ? void 0 : client.assetId)];
                        case 1:
                            asset = _e.sent();
                            distance = (distance_1.default.calcCrow(((_a = asset === null || asset === void 0 ? void 0 : asset.position) === null || _a === void 0 ? void 0 : _a.lat) || 0, ((_b = asset === null || asset === void 0 ? void 0 : asset.position) === null || _b === void 0 ? void 0 : _b.long) || 0, ((_c = client === null || client === void 0 ? void 0 : client.client.coordinate) === null || _c === void 0 ? void 0 : _c.lat) || 0, ((_d = client === null || client === void 0 ? void 0 : client.client.coordinate) === null || _d === void 0 ? void 0 : _d.long) || 0) * 1000);
                            if ((distance <= 100 && distance >= 0) && (distance % 10 == 0)) {
                                connectedClientWS === null || connectedClientWS === void 0 ? void 0 : connectedClientWS.ws.send("asset is " + distance + " meters away");
                            }
                            else {
                                connectedClientWS === null || connectedClientWS === void 0 ? void 0 : connectedClientWS.ws.send(JSON.stringify(__assign(__assign({}, asset), { distance: "distance: " + distance })));
                            }
                            return [2 /*return*/];
                    }
                });
            }); });
        });
        connectedClients.forEach(function (client) { return client; });
    }, 5000);
}
exports.default = wsSetup;
