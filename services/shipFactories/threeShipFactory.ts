import { DestroyerShip } from '../shipCategories/destroyer'
import { LightnightShip } from '../shipCategories/lightnight'
import { SubmarineShip } from '../shipCategories/submarine'
import ShipFactory from './shipFactory'

export default class ThreeShipFactory extends ShipFactory {
    constructor(atlasSize: number) {
        super(atlasSize)

        DestroyerShip.createManager('Destroyer', 1)
        LightnightShip.createManager('Lightnight', 1)
        SubmarineShip.createManager('Submarine', 1)

        this._shipCategoryManagerList.push(DestroyerShip.manager)
        this._shipCategoryManagerList.push(LightnightShip.manager)
        this._shipCategoryManagerList.push(SubmarineShip.manager)

        this._shipCategoryList.push(new DestroyerShip().build())
        this._shipCategoryList.push(new LightnightShip().build())
        this._shipCategoryList.push(new SubmarineShip().build())
    }
}
