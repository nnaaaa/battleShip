import NormalTiles from './tiles/normalTiles'
import Water from './background/water'
import BattleShipService from 'games/battleShip/services'
import { useMemo } from 'react'
import { IAtlatSize } from 'games/battleShip/modals/state'
import { ISensorTiles } from 'games/battleShip/modals/map'
import SensorTiles from './tiles/sensorTiles'

interface IHiddenAtlas {
    size: IAtlatSize
    sensors: ISensorTiles
}

const HiddenAtlas = ({ size, sensors }: IHiddenAtlas) => {
    const _borderTiles = useMemo(() => BattleShipService.initBorderTiles(size), [size])

    return (
        <Water size={size}>
            <NormalTiles map={_borderTiles} />
            <SensorTiles sensors={sensors} clickable />
        </Water>
    )
}

export default HiddenAtlas
