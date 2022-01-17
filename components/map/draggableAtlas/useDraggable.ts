import { IBody, IShip } from 'games/battleShip/modals/ship'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import { useState } from 'react'

export interface Position {
    x: number
    y: number
}

const useDraggable = (ShipFactory: ShipFactory | undefined) => {
    const [pickedBodyOrder, setPickedBodyOrder] = useState<number>()
    const [pickedShip, setPickedShip] = useState<IShip>()

    const dragDrop = (pos: Position) => {
        if (!pickedBodyOrder || !pickedShip || !ShipFactory) return
        ShipFactory.createShipManually(pos, pickedBodyOrder, pickedShip)
    }
    return { pickedBodyOrder, setPickedBodyOrder, pickedShip, setPickedShip, dragDrop }
}

export default useDraggable
