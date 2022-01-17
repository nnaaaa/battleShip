import {
    IShipCategories,
    IShipCategoryManager,
    IShipSize,
    ListShipName,
} from 'games/battleShip/modals/ship'

export class ShipSize implements IShipSize {
    public width: number
    public height: number
    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        if (this.width < this.height) {
            this.width = height
            this.height = width
        }
    }
}

export class ShipCategoryManager implements IShipCategoryManager {
    public current: number
    constructor(public name: ListShipName, public limit: number) {
        this.current = 0
    }
    public isEqualLimitShipCategory() {
        return this.current < this.limit ? false : true
    }
}

export abstract class ShipCategories {
    public static manager: ShipCategoryManager
    public static createManager(name: ListShipName, limitShip: number) {
        this.manager = new ShipCategoryManager(name, limitShip)
    }
    public static setManager(limitShip: number) {
        this.manager.limit = limitShip
    }
    abstract build(): IShipCategories
}
