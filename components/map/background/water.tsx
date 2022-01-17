import { IAtlatSize } from 'games/battleShip/modals/state'
import Constants from 'games/battleShip/services/constants'

interface IWaterProps {
    size: number
}

const Water: React.FC<IWaterProps> = ({ children, size }) => {
    return (
        <div
            style={{
                position: 'relative',
                width: `${Constants.boardSize * size}px`,
                height: `${Constants.boardSize * size}px`,
                boxSizing: 'border-box',
                background: `url(${Constants.waterImage}) center center / 
                    ${Constants.boardSize * size}px ${Constants.boardSize * size}px`,
            }}
        >
            {children}
        </div>
    )
}

export default Water
