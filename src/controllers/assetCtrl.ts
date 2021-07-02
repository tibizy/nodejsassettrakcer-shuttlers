'use strict';
import {Request, Response} from 'express'
import * as AccountService from '../services/assetService'

export async function get(req: Request, res: Response) {
  let param = req.body || {}; const client = res.locals.client;

  const result = await AccountService.getAllAsset();
  res.json(result);
}

export async function getAllConnectedClient(req: Request, res: Response) {
  let param = req.body || {}; const client = res.locals.client;

  const result = await AccountService.getAllConnectedClient();
  res.json(result);
}

export async function updateAssetPosition(req: Request, res: Response) {
  let param = req.body || {}; const client = res.locals.client;
  const assetId = req.params.assetId;

  console.log('param', param)
  //6.5361172,3.3292086
  const result = await AccountService.updateAssetPosition(assetId, {lat: param.lat, long: param.long});
  res.json(result);
  // if(err) res.status(HttpStatus.BAD_REQUEST).send( { message: err.message} );
}
