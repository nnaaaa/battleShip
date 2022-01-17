import { IShip, IShipDirection } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'

export const Image = ({ ship }: { ship: IShip }) => {
    const isVertical = ship.direction === 'top' || ship.direction === 'bottom'
    const verticalSize = isVertical
        ? ship.size
        : { width: ship.size.height, height: ship.size.width }

    const rotate = (direction: IShipDirection) => {
        switch (direction) {
            case 'top':
                return 'translate(-50%,-50%) rotate(0) scale(0.8)'
            case 'left':
                return 'translate(-50%,-50%) rotate(-90deg) scale(0.8)'
            case 'bottom':
                return 'translate(-50%,-50%) rotate(180deg) scale(0.8)'
            case 'right':
                return 'translate(-50%,-50%) rotate(90deg) scale(0.8)'
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
                top: '50%',
                left: '50%',
                zIndex: 10000,
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    width: verticalSize.width * Constants.boardSize,
                    height: verticalSize.height * Constants.boardSize,
                    background: `url(${Constants.getShipImage(
                        ship.name
                    )}) center center / 
                                ${verticalSize.width * Constants.boardSize}px 
                                ${verticalSize.height * Constants.boardSize}px no-repeat`,
                    imageRendering: 'pixelated',
                }}
            />
        </div>
    )
}
