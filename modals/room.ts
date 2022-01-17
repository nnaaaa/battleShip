import { ID } from 'models/common'
import { IPublicInfo } from 'models/user'
import { ISensorTiles } from './map'
import { IShip } from './ship'
import { IAtlatSize, ILimitShip } from './state'

export type IMode = 'random' | 'select'

export type IRole = 'player1' | 'player2' | 'spectator'

export interface IPlayer {
    id: string
    avatar: string
    name: string
}

export interface IMessage {
    owner: IPublicInfo
    content: string
}

export interface IRoom {
    _id: ID
    atlasSize: IAtlatSize
    limitShip: ILimitShip
    mode: IMode
    isStarting: boolean
    player1: IPublicInfo | undefined
    player2: IPublicInfo | undefined
    ships1: IShip[]
    ships2: IShip[]
    sensors1: ISensorTiles
    sensors2: ISensorTiles
    userReady: IPublicInfo[]
    arranged: IPublicInfo[]
    spectators: IPublicInfo[]
    turn: ID
    message?: IMessage
}
