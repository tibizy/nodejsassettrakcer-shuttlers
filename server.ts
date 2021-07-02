import express from 'express';
import * as http from 'http';
import fs from 'fs';
import bodyParser from 'body-parser';

import routes from './src/routes';
import wsSetup from './src/ws-setup';
import * as AssetService from './src/services/assetService'

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

//initialize the express server instance
const server = http.createServer(app);

routes(app, {});
//initialize the WebSocket server instance
wsSetup(server, {});

app.get('/', function(request: any, response: any){
   response.sendFile(__dirname + '/index.html');
   console.log(__dirname + '/index.html')
})

server.listen(8081, function () {
   var host = 'localhost'//server.address().address
   var port = 8081//server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
