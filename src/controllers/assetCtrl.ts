'use strict';
import {Request, Response} from 'express'
import * as AccountService from '../services/assetService'

export async function get(req: Request, res: Response) {
  const result = await AccountService.getAllAsset();
  res.json(result);
}

export async function getAllConnectedClient(req: Request, res: Response) {
  const result = await AccountService.getAllConnectedClient();
  res.json(result);
}

export async function updateAssetPosition(req: Request, res: Response) {
  let param = req.body || {}; const assetId = req.params.assetId; //6.5361172,3.3292086
  const result = await AccountService.updateAssetPosition(assetId, {lat: param.lat, long: param.long});
  res.json(result);
}
