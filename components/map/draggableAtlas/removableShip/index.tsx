import { IShip } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'
import { Image } from './shipImage'
import className from './style.module.css'

const RemovableShip = ({ ship, onRemove }: { ship: IShip; onRemove: () => void }) => {
    return (
        <div
            className={className.animation}
            key={'ship' + ship.body.toString()}
            style={{
                width: ship.size.width * Constants.boardSize,
                height: ship.size.height * Constants.boardSize,
                // backgroundColor: ship.color,
                position: 'absolute',
                top: ship.body[0].y * Constants.boardSize,
                left: ship.body[0].x * Constants.boardSize,
                borderRadius: Constants.boardSize / 2,
            }}
            onClick={onRemove}
        >
            <Image ship={ship} />
        </div>
    )
}

export default RemovableShip
