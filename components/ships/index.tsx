import { IShip } from 'games/battleShip/modals/ship'
import Ship from './ship'

const Ships = ({ ships }: { ships: IShip[] }) => {
    return (
        <>
            {ships.map((ship, i) => (
                <Ship ship={ship} key={'shipDropped' + i} />
            ))}
        </>
    )
}

export default Ships
