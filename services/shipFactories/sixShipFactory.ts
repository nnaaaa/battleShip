import { CarrierShip } from '../shipCategories/carrier'
import { CruiserShip } from '../shipCategories/cruiser'
import { PatrolShip } from '../shipCategories/patrol'
import ThreeShipFactory from './threeShipFactory'

class SixShipFactory extends ThreeShipFactory {
    constructor(atlasSize: number) {
        super(atlasSize)

        CarrierShip.createManager('Carrier', 1)
        CruiserShip.createManager('Cruiser', 1)
        PatrolShip.createManager('Patrol', 1)

        this._shipCategoryManagerList.push(CarrierShip.manager)
        this._shipCategoryManagerList.push(CruiserShip.manager)
        this._shipCategoryManagerList.push(PatrolShip.manager)

        this._shipCategoryList.push(new CarrierShip().build())
        this._shipCategoryList.push(new CruiserShip().build())
        this._shipCategoryList.push(new PatrolShip().build())
    }
}
export default SixShipFactory
