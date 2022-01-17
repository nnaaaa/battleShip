import NormalTiles from './tiles/normalTiles'
import Water from './background/water'
import { IAtlatSize } from 'games/battleShip/modals/state'
import { IShip } from 'games/battleShip/modals/ship'
import Ships from '../ships'
import { useMemo, memo } from 'react'
import BattleShipService from 'games/battleShip/services'

interface IShipAtlasProps {
    size: IAtlatSize
    ships: IShip[]
}

const ShipAtlas = ({ size, ships }: IShipAtlasProps) => {
    const borderTiles = useMemo(() => BattleShipService.initBorderTiles(size), [size])
    const _ships = useMemo(
        () => (ships ? ships : BattleShipService.initShips(3, size)),
        [size, ships]
    )
    return (
        <Water size={size}>
            <NormalTiles map={borderTiles} />
            <Ships ships={_ships} />
        </Water>
    )
}

export default memo(ShipAtlas)
