import Ships from 'games/battleShip/components/ships'
import { ISensorTiles } from 'games/battleShip/modals/map'
import { IShip } from 'games/battleShip/modals/ship'
import { IAtlatSize } from 'games/battleShip/modals/state'
import BattleShipService from 'games/battleShip/services'
import { useMemo } from 'react'
import Water from './background/water'
import SensorTiles from './tiles/sensorTiles'
import NormalTiles from './tiles/normalTiles'

interface ISensorAtlas {
    size: IAtlatSize
    sensors: ISensorTiles
    ships: IShip[]
}

const SensorAtlas = ({ size, sensors, ships }: ISensorAtlas) => {
    const _borderTiles = useMemo(() => BattleShipService.initBorderTiles(size), [size])
    return (
        <Water size={size}>
            <NormalTiles map={_borderTiles} />
            <Ships ships={ships} />
            <SensorTiles sensors={sensors} />
        </Water>
    )
}

export default SensorAtlas
