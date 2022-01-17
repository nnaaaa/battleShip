import { DestroyerShip } from '../shipCategories/destroyer'
import { LightnightShip } from '../shipCategories/lightnight'
import SixShipFactory from './sixShipFactory'

class EightShipFactory extends SixShipFactory {
    constructor(atlasSize: number) {
        super(atlasSize)

        DestroyerShip.setManager(2)
        LightnightShip.setManager(2)

        this._shipCategoryList.push(new DestroyerShip().build())
        this._shipCategoryList.push(new LightnightShip().build())
    }
}

export default EightShipFactory
