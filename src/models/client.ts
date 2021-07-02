import { Coordinates } from "./asset"

export type Client = {
    id: string,
    username: string,
    coordinate: Coordinates
}

export type ConnectedClient = {
    client: Client
    assetId: string
}