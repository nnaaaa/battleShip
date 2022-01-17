import Carrier from 'games/battleShip/assets/carrier.png'
import Cruiser from 'games/battleShip/assets/cruiser.png'
import Destroyer from 'games/battleShip/assets/destroyer.png'
import Lightnight from 'games/battleShip/assets/lightnight.png'
import Patrol from 'games/battleShip/assets/patrol.png'
import Rescue from 'games/battleShip/assets/rescue.png'
import Submarine from 'games/battleShip/assets/submarine.png'
import water from 'games/battleShip/assets/water2.gif'

interface ListImage {
    [key: string]: string
}

class CONSTANTS {
    private _boardSize: number
    private _shipImage: ListImage
    private _waterImage: any
    private _maxShipSize: number
    constructor() {
        this._shipImage = {
            Rescue,
            Destroyer,
            Submarine,
            Patrol,
            Cruiser,
            Carrier,
            Lightnight,
        }
        this._waterImage = water
        this._boardSize = 30
        this._maxShipSize = 5
    }
    setBoardSize(newSize: number) {
        this._boardSize = newSize
    }
    setMaxShipSize(newSize: number) {
        this._maxShipSize = newSize
    }
    getShipImage(shipName: string) {
        return this._shipImage[shipName]
    }
    public get waterImage() {
        return this._waterImage
    }
    public get boardSize() {
        return this._boardSize
    }
    public get maxShipSize() {
        return this._maxShipSize
    }
}

export default new CONSTANTS()
