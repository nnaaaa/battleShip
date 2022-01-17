import { IShip, IShipDirection } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'
import Tilty from 'react-parallax-tilt'

export const Image = ({ ship }: { ship: IShip }) => {
    const isVertical = ship.direction === 'top' || ship.direction === 'bottom'
    const verticalSize = isVertical
        ? ship.size
        : { width: ship.size.height, height: ship.size.width }

    const rotate = (direction: IShipDirection) => {
        switch (direction) {
            case 'top':
                return 'rotate(0) scale(0.9)'
            case 'left':
                return 'translate(-50%,-50%) rotate(-90deg) scale(0.9)'
            case 'bottom':
                return 'rotate(180deg) scale(0.9)'
            case 'right':
                return 'translate(-50%,-50%) rotate(90deg) scale(0.9)'
            default:
                return ''
        }
    }

    return (
        <div
            style={{
                position: 'absolute',
                width: verticalSize.width * Constants.boardSize,
                height: verticalSize.height * Constants.boardSize,

                transform: rotate(ship.direction),
                top: isVertical ? '0' : '50%',
                left: isVertical ? '0' : '50%',
                zIndex: 10000,
            }}
        >
            <Tilty
                scale={1.2}
                style={{
                    position: 'absolute',
                    width: verticalSize.width * Constants.boardSize,
                    height: verticalSize.height * Constants.boardSize,
                    transformStyle: 'preserve-3d',
                }}
            >
                <div
                    style={{
                        transform: 'translateZ(30px)',
                        position: 'absolute',
                        width: verticalSize.width * Constants.boardSize,
                        height: verticalSize.height * Constants.boardSize,
                        background: `url(${Constants.getShipImage(
                            ship.name
                        )}) center center / 
                    ${verticalSize.width * Constants.boardSize}px 
                                ${verticalSize.height * Constants.boardSize}px no-repeat`,
                        cursor: 'pointer',
                        imageRendering: 'pixelated',
                    }}
                />
            </Tilty>
        </div>
    )
}
