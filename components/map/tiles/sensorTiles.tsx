import { ISensorTiles } from 'games/battleShip/modals/map'
import Constants from 'games/battleShip/services/constants'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext } from 'react'
import styled, { keyframes } from 'styled-components'

const ripple = keyframes`
    0% {
        transform:translate(-50%,-50%) scale(1);
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100% {
        transform:translate(-50%,-50%) scale(1.5);
        opacity: 0;
    }
`
const EdgeStyled = styled.div`
    position: absolute;
    width: 14px;
    height: 14px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid white;
    border-radius: 50%;
    animation: ${ripple} 1.2s infinite ease-in-out;
`

const CenterStyled = styled.div`
    position: absolute;
    width: 8px;
    height: 8px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
`

const WrapperStyledClickable = styled.div`
    position: absolute;
    box-sizing: border-box;
    z-index: 200000;
    opacity: 0;
    cursor: pointer;
    &:hover {
        opacity: 0.4;
    }
`
const WrapperStyledMarked = styled.div`
    position: absolute;
    box-sizing: border-box;
    z-index: 200000;
    opacity: 0;
    cursor: pointer;
`

const SensorTiles = ({
    sensors,
    clickable,
}: {
    sensors: ISensorTiles
    clickable?: boolean
}) => {
    const { attack } = useContext(RoomContext)

    return (
        <>
            {sensors.map((tile, idx) => {
                const color = tile.type === 'hit' ? 'red' : 'white'
                const blur = tile.type === 'pure'
                const wrapperStyleDynamic: any = {
                    width: Constants.boardSize,
                    height: Constants.boardSize,
                    left: tile.x * Constants.boardSize,
                    top: tile.y * Constants.boardSize,
                }
                const edgeStyleDynamic = {
                    borderColor: color,
                }
                const centerStyleDynamic = {
                    backgroundColor: color,
                }
                if (!blur) wrapperStyleDynamic.opacity = 1

                if (!clickable)
                    return (
                        <WrapperStyledMarked
                            key={`sensor ${tile.x}+${tile.y} marked`}
                            style={wrapperStyleDynamic}
                            onClick={() => {
                                if (!attack || !clickable) return
                                attack(tile)
                            }}
                        >
                            <EdgeStyled style={edgeStyleDynamic} />
                            <CenterStyled style={centerStyleDynamic} />
                        </WrapperStyledMarked>
                    )

                return (
                    <WrapperStyledClickable
                        key={`sensor ${tile.x}+${tile.y} clickable`}
                        style={wrapperStyleDynamic}
                        onClick={() => {
                            if (!attack || !clickable) return
                            attack(tile)
                        }}
                    >
                        <EdgeStyled style={edgeStyleDynamic} />
                        <CenterStyled style={centerStyleDynamic} />
                    </WrapperStyledClickable>
                )
            })}
        </>
    )
}

export default SensorTiles
