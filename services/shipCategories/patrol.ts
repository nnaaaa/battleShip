import { IShipCategories } from 'games/battleShip/modals/ship'
import { ShipCategories, ShipSize } from './ship'

export class PatrolShip extends ShipCategories {
    build() {
        const name = 'Patrol'
        const category: IShipCategories = {
            name,
            size: new ShipSize(3, 1),
        }
        return category
    }
}
