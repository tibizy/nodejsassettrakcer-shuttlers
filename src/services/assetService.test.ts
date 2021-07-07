import WS from 'jest-websocket-mock';
import WebSocket from 'ws';
import * as AssetService from './assetService';

const sampleData = { "id": "1", "name": "asset-1", "position": {"lat": 6.556961, "long": 3.329431} };

test('get a single asset by id', () => {
  expect.assertions(1);
  return AssetService.getAssetById("1").then(data => expect(data?.name).toEqual('asset-1'));
});

test('get all asset', () => {
  expect.assertions(1);
  return AssetService.getAllAsset().then(data => expect(data[1].name).toEqual('asset-2'));
});

test('update asset position', () => {
  expect.assertions(1);
  AssetService.updateAssetPosition("1", {lat: 6.4774138, long: 3.3676215})
  AssetService.getAssetById("1").then(data => expect(data?.position).toEqual({lat: 6.4774138, long: 3.3676215}));
  return AssetService.resetAssetData().then();
});

test('notify connected client tracking assets', async () => {
  expect.assertions(2);
  const wsc = new WebSocket('ws://localhost:8081/');

  let counter = 1;
  let assetUpdated = false;

  wsc.onopen= function(event){
    if(!test3Complete) console.log('onopen')
    wsc.send(
      JSON.stringify({
        event: 'TRACK_ASSET',
        data: { client: {username: "johndoe", coordinate: { lat: 6.4783634, long: 3.3677693 } }, assetId: 1 }
      })
    );
  };

  wsc.onclose = function(event){
    if(!test3Complete) console.log('onclose')
  };

  let test2Complete = false, test3Complete = false;
  wsc.onmessage = async (event) => {
    if(!test3Complete){
      console.log(counter, assetUpdated, 'data from ws server', event.data);
      if(counter == 1 && event.data !== "Hi there, I am a WebSocket server") {
        await delay(5000, 5);
        counter = 5
      };
      if(counter == 5 && !assetUpdated && !test2Complete) {
        test2Complete = true;
        expect(event.data).toEqual(JSON.stringify({ id: "1", location: `6.4764224, 3.3682224`}));
        await AssetService.updateAssetPosition("1", {lat: 6.4774138, long: 3.3676215})
        counter += 5
        assetUpdated = true;
      }
      if(counter == 10 && assetUpdated && !test3Complete) {
        test3Complete = true;
        expect(event.data).toEqual(`asset is ${128} meters away`);
        await delay(5000, 5);
        wsc.close();
      }
    }

  };

  await delay(20000, 5);
  return AssetService.getAllAsset().then(data => expect(data[1].name).toEqual('asset-2'));
}, 30000);


function delay(t: number, val: any) {
  return new Promise(function(resolve) {
      setTimeout(function() {
          resolve(val);
      }, t);
  });
}