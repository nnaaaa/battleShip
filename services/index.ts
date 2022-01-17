import { IBorderTiles, ISensorTiles } from 'games/battleShip/modals/map'
import { IShip } from 'games/battleShip/modals/ship'
import { IAtlatSize, ILimitShip } from 'games/battleShip/modals/state'
import EightShipFactory from 'games/battleShip/services/shipFactories/eightShipFactory'
import ShipFactory from './shipFactories/shipFactory'
import SixShipFactory from './shipFactories/sixShipFactory'
import ThreeShipFactory from './shipFactories/threeShipFactory'

interface IBattleShipGameService {
    initBorderTiles: (size: IAtlatSize) => IBorderTiles
    initSensorTiles: (size: IAtlatSize) => ISensorTiles
    initShips: (limitShip: ILimitShip, atlasSize: IAtlatSize) => IShip[]
    isDestroyFullShip: (ship: IShip) => boolean
    isEndGame: (ships: IShip[]) => boolean
}

class BattleShipGameService implements IBattleShipGameService {
    initBorderTiles = (atlasSize: IAtlatSize) => {
        const tiles = []
        for (let i = 0; i < atlasSize * atlasSize; ++i) tiles.push(i)
        return tiles
    }
    initSensorTiles = (atlasSize: IAtlatSize) => {
        const tiles: ISensorTiles = []
        for (let i = 0; i < atlasSize; ++i) {
            for (let j = 0; j < atlasSize; ++j)
                tiles.push({
                    x: j,
                    y: i,
                    type: 'pure',
                })
        }
        return tiles
    }
    initShips = (limitShip: ILimitShip, atlasSize: IAtlatSize) => {
        let shipFactory: ShipFactory
        let ships: IShip[] = []
        if (limitShip === 3) shipFactory = new ThreeShipFactory(atlasSize)
        else if (limitShip === 6) shipFactory = new SixShipFactory(atlasSize)
        else shipFactory = new EightShipFactory(atlasSize)
        ships = shipFactory.manufacture()
        return ships
    }
    isDestroyFullShip = (ship: IShip) => {
        let isDestroy = true
        for (let body of ship.body) {
            if (body.type === 'pure') {
                isDestroy = false
                break
            }
        }
        return isDestroy
    }
    isEndGame = (ships: IShip[]) => {
        let isEnd = true
        for (let oneship of ships) {
            for (let body of oneship.body) {
                if (body.type === 'pure') {
                    isEnd = false
                    break
                }
            }
        }
        return isEnd
    }
}

export default new BattleShipGameService()
