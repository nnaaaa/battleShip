import url from 'games/battleShip/api'
import { IShip } from 'games/battleShip/modals/ship'
import BattleShipService from 'games/battleShip/services'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import Screen from '..'
import CountDown from '../countDown'

export const usePrepared = (
    ships: IShip[],
    changeScreen: (screen: typeof Screen) => void
) => {
    const { room } = useContext(RoomContext)
    const { socket } = useContext(SocketContext)
    const user = useAppSelector((state) => state.user.current)

    useEffect(() => {
        if (!room || !socket || !user) return
        const player1 = room.player1
        const player2 = room.player2
        if (!player1 || !player2) return
        if (room.arranged.length !== 2) return

        if (user._id === player1._id) {
            socket.emit(`${url}/updateRoom`, {
                _id: room._id,
                isStarting: true,
                turn: user._id,
                ships1: ships,
                sensors1: BattleShipService.initSensorTiles(room.atlasSize),
            })
        } else if (user._id === player2._id) {
            socket.emit(`${url}/updateRoom`, {
                _id: room._id,
                ships2: ships,
                sensors2: BattleShipService.initSensorTiles(room.atlasSize),
            })
        }
        changeScreen(CountDown)
    }, [room, user, socket])
}
