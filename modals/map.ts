export type IBorderTiles = number[]

export interface ISensor {
    x: number
    y: number
    type: 'pure' | 'hit' | 'miss'
}

export type ISensorTiles = ISensor[]
