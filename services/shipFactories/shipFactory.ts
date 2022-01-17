import {
    IBody,
    IShip,
    IShipCategories,
    ListShipName,
    IShipDirection,
} from 'games/battleShip/modals/ship'
import { ShipCategoryManager } from '../shipCategories/ship'
import { Position } from 'games/battleShip/components/map/draggableAtlas/useDraggable'

export default abstract class ShipFactory {
    protected _ships: IShip[]
    protected _shipCategoryList: IShipCategories[]
    protected _shipCategoryListBuilt: IShipCategories[]
    protected _shipCategoryManagerList: ShipCategoryManager[]
    protected _atlasSize: number
    constructor(atlatSize: number) {
        this._atlasSize = atlatSize
        this._ships = []
        this._shipCategoryList = []
        this._shipCategoryListBuilt = []
        this._shipCategoryManagerList = []
    }
    public deleteShip(index: number) {
        const ship = this._ships.find((s, idx) => idx === index)
        if (!ship) return
        const category = this._shipCategoryListBuilt.find((ctg) => ctg.name === ship.name)
        if (!category) return
        this._ships = this._ships.filter((s, idx) => idx !== index)
        this._shipCategoryListBuilt = this._shipCategoryListBuilt.filter(
            (ctg) => ctg !== category
        )
        this._shipCategoryManagerList.forEach(
            (mng) => mng.name === ship.name && mng.current--
        )
        this._shipCategoryList.push(category)
    }
    public createShipsByRand() {
        for (const category of this._shipCategoryList)
            this.createShipByRand(category.name)
    }
    public createShipByRand = (shipName: ListShipName) => {
        if (this.isEqualLimit(shipName)) return
        const shipCategory = this._shipCategoryList.find((ctg) => ctg.name === shipName)
        if (!shipCategory) return
        const isHorizontal = this.rand(0, 2)
        let newShipSize = isHorizontal
            ? shipCategory.size
            : {
                  width: shipCategory.size.height,
                  height: shipCategory.size.width,
              }

        this._shipCategoryList = this._shipCategoryList.filter(
            (ctg) => ctg !== shipCategory
        )
        this._shipCategoryListBuilt.push(shipCategory)
        this._shipCategoryManagerList.forEach(
            (mng) => mng.name === shipCategory.name && mng.current++
        )

        while (true) {
            const x = this.rand(0, this._atlasSize - newShipSize.width)
            const y = this.rand(0, this._atlasSize - newShipSize.height)
            const _body: IBody[] = this.createBody(
                x,
                y,
                newShipSize.width,
                newShipSize.height
            )
            if (!this.isJostle(_body)) {
                const _ship: IShip = {
                    body: _body,
                    direction: isHorizontal ? 'left' : 'top',
                    ...shipCategory,
                    size: newShipSize,
                }
                this._ships.push(_ship)
                break
            }
        }
    }
    public createRepresentShip = (shipName: ListShipName, direction: IShipDirection) => {
        const shipCategory = this._shipCategoryList.find((ctg) => ctg.name === shipName)
        if (!shipCategory) return

        let newShipSize =
            direction === 'left' || direction === 'right'
                ? shipCategory.size
                : {
                      width: shipCategory.size.height,
                      height: shipCategory.size.width,
                  }

        const ship: IShip = {
            body: this.createBody(0, 0, newShipSize.width, newShipSize.height),
            direction,
            ...shipCategory,
            size: newShipSize,
        }

        return ship
    }
    public createShipManually(pos: Position, bodyOrder: number, ship: IShip) {
        if (this.isEqualLimit(ship.name)) return

        const shipCategory = this._shipCategoryList.find((ctg) => ctg.name === ship.name)
        if (!shipCategory) return

        const { x, y } = pos
        const currentX = bodyOrder % ship.size.width
        const currentY = Math.floor(bodyOrder / ship.size.width)
        const lastBodyX = ship.size.width - 1 - currentX
        const lastBodyY = ship.size.height - 1 - currentY
        const firstBodyX = -currentX
        const firstBodyY = -currentY

        if (
            firstBodyX + x < 0 ||
            firstBodyY + y < 0 ||
            lastBodyX + x >= this._atlasSize ||
            lastBodyY + y >= this._atlasSize
        )
            return

        const _body: IBody[] = this.createBody(
            x - currentX,
            y - currentY,
            ship.size.width,
            ship.size.height
        )
        if (!this.isJostle(_body)) {
            const _ship: IShip = {
                ...ship,
                body: _body,
            }
            this._ships.push(_ship)
            this._shipCategoryList = this._shipCategoryList.filter(
                (ctg) => ctg !== shipCategory
            )
            this._shipCategoryListBuilt.push(shipCategory)
            this._shipCategoryManagerList.forEach(
                (mng) => mng.name === shipCategory.name && mng.current++
            )
        }
    }
    public clearShips() {
        this._ships = []
        this._shipCategoryList = this._shipCategoryList.concat(
            this._shipCategoryListBuilt
        )
        this._shipCategoryListBuilt = []
        this._shipCategoryManagerList.forEach((mng) => (mng.current = 0))
    }
    protected rand = (min: number, max: number) =>
        Math.floor(Math.random() * (max - min) + min)
    protected createBody(initX: number, initY: number, width: number, height: number) {
        const _body: IBody[] = []
        for (let i = 0; i < width; ++i) {
            for (let j = 0; j < height; ++j) {
                const body: IBody = {
                    x: initX + i,
                    y: initY + j,
                    type: 'pure',
                }
                _body.push(body)
            }
        }
        return _body
    }
    protected isJostle = (newBody: IBody[]) => {
        const oldShipsBody = this._ships.map((oldShip) => oldShip.body)
        for (const oldBody of oldShipsBody) {
            for (const oS of oldBody) {
                for (const nS of newBody) if (oS.x == nS.x && oS.y == nS.y) return true
            }
        }

        return false
    }
    protected isEqualLimit(shipName: ListShipName) {
        for (const manager of this._shipCategoryManagerList) {
            if (manager.name === shipName) {
                return manager.isEqualLimitShipCategory()
            }
        }
        return false
    }

    public manufacture() {
        this.createShipsByRand()
        return this.getShips()
    }
    public getShips() {
        return [...this._ships]
    }
    public getManagerList() {
        return [...this._shipCategoryManagerList]
    }
    public getCategoryList() {
        return [...this._shipCategoryList]
    }
}
