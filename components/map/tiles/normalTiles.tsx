import { IBorderTiles } from 'games/battleShip/modals/map'
import Constants from 'games/battleShip/services/constants'

const NormalMap = ({ map }: { map: IBorderTiles }) => {
    return (
        <>
            {map?.map((id) => {
                return (
                    <div
                        key={'map' + id}
                        style={{
                            width: Constants.boardSize,
                            height: Constants.boardSize,
                            position: 'absolute',
                            left: (id % Math.sqrt(map.length)) * Constants.boardSize,
                            top:
                                Math.floor(id / Math.sqrt(map.length)) *
                                Constants.boardSize,
                            borderRight: '1px solid white',
                            borderBottom: '1px solid white',
                        }}
                    />
                )
            })}
        </>
    )
}

export default NormalMap
