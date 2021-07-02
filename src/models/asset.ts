export type Asset = {
    id: string,
    name: string,
    position: Coordinates
}

export type Coordinates =  {
    lat: number,
    long: number,
}