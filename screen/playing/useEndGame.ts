import url from 'games/battleShip/api'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import Screen from '..'
import Waiting from '../waiting'

export const useEndGame = (changeScreen: (screen: typeof Screen) => void) => {
    const { socket } = useContext(SocketContext)
    const { room } = useContext(RoomContext)

    useEffect(() => {
        if (!room || !socket) return
        if (!room.isStarting) {
            changeScreen(Waiting)
            return
        }
        if (room.message && room.message.content.search('winner') >= 0) {
            const setEndGame = async () => {
                setTimeout(async () => {
                    socket.emit(`${url}/updateRoomAndDeleteMessage`, {
                        _id: room._id,
                        ships1: [],
                        ships2: [],
                        sensors1: [],
                        sensors2: [],
                        userReady: [],
                        arranged: [],
                        isStarting: false,
                    })
                }, 3000)
            }
            setEndGame().then(() => {})
        } else if (!room.player1) {
            const nameSplit = room.player2?.username.split(' ')
            const firstName = nameSplit?.[
                nameSplit?.length ? nameSplit?.length - 1 : 0
            ]?.slice(0, 7)
            socket.emit(`${url}/updateRoom`, {
                _id: room._id,
                message: {
                    content: 'is winner',
                    owner: {
                        ...room.player2,
                        username: firstName,
                    },
                },
            })
        } else if (!room.player2) {
            const nameSplit = room.player1?.username.split(' ')
            const firstName = nameSplit?.[
                nameSplit?.length ? nameSplit?.length - 1 : 0
            ]?.slice(0, 7)

            socket.emit(`${url}/updateRoom`, {
                _id: room._id,
                message: {
                    content: 'is winner',
                    owner: {
                        ...room.player1,
                        username: firstName,
                    },
                },
            })
        }
    }, [room])
}
