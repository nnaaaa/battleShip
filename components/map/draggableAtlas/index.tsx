import { IRoom } from 'games/battleShip/modals/room'
import { IShip } from 'games/battleShip/modals/ship'
import BattleShipService from 'games/battleShip/services'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import { Dispatch, SetStateAction, useMemo } from 'react'
import Water from '../background/water'
import DroppableTile from './droppableTile'
import RemovableShip from './removableShip'
import useDraggable from './useDraggable'

interface IDraggableAtlas {
    dragTool: ReturnType<typeof useDraggable>
    ships: IShip[]
    room: IRoom
    setShips: Dispatch<SetStateAction<IShip[]>>
    ShipFactory: ShipFactory
}
const DraggableAtlas = (props: IDraggableAtlas) => {
    const { dragTool, ships, room, setShips, ShipFactory } = props
    const _borderTiles = useMemo(
        () => BattleShipService.initBorderTiles(room.atlasSize),
        [room.atlasSize]
    )
    return (
        <Water size={room.atlasSize}>
            {_borderTiles.map((id, idx) => {
                const x = id % room.atlasSize
                const y = Math.floor(id / room.atlasSize)
                return (
                    <DroppableTile
                        x={x}
                        y={y}
                        key={'droppabletile' + idx}
                        onDrop={() => {
                            dragTool.dragDrop({ x, y })
                            setShips(ShipFactory.getShips())
                        }}
                    />
                )
            })}
            {ships.map((ship, i) => (
                <RemovableShip
                    ship={ship}
                    onRemove={() => {
                        ShipFactory.deleteShip(i)
                        setShips(ShipFactory.getShips())
                    }}
                    key={'shipDropped' + i}
                />
            ))}
        </Water>
    )
}

export default DraggableAtlas
