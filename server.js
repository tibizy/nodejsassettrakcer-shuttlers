"use strict";
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
var express_1 = __importDefault(require("express"));
var http = __importStar(require("http"));
var body_parser_1 = __importDefault(require("body-parser"));
var routes_1 = __importDefault(require("./src/routes"));
var ws_setup_1 = __importDefault(require("./src/ws-setup"));
var app = express_1.default();
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded());
// parse application/json
app.use(body_parser_1.default.json());
//initialize the express server instance
var server = http.createServer(app);
routes_1.default(app, {});
//initialize the WebSocket server instance
ws_setup_1.default(server, {});
app.get('/', function (request, response) {
    response.sendFile(__dirname + '/index.html');
    console.log(__dirname + '/index.html');
});
server.listen(8081, function () {
    var host = 'localhost'; //server.address().address
    var port = 8081; //server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});
