'use strict';
import * as assetCtrl from './controllers/assetCtrl';

export default function route(app: any, config: any) {

  app.route('/assets')
    .get(assetCtrl.get)

  app.route('/assets/:assetId/connectedclients')
  .get(assetCtrl.getAllConnectedClient)


  app.route('/assets/:assetId/position')
    .post(assetCtrl.updateAssetPosition)

}