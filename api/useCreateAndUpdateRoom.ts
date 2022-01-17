import { ID } from 'models/common'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import url from '.'
import { useAppSelector } from '../../../states/hooks'
import { IRoom } from '../modals/room'

export const useCreateAndUpdateRoom = (
    roomId: ID | undefined,
    setRoom: Dispatch<SetStateAction<IRoom | undefined>>,
    setRoomId: Dispatch<SetStateAction<string | undefined>>
) => {
    const user = useAppSelector((state) => state.user.current)
    const { socket } = useContext(SocketContext)
    useEffect(() => {
        if (!socket || !user) return
        const listener = async (room: IRoom) => {
            setRoom((pre) => {
                if (!pre) return room
                return { ...pre, ...room }
            })
        }

        const firstTimeListener = (room: IRoom) => {
            setRoom(room)
            setRoomId(room._id)
        }
        socket.on(`${url}/getRoom/${user._id}`, firstTimeListener)

        if (!roomId) return
        socket.on(`${url}/updateRoom/${roomId}`, listener)
        return () => {
            socket.off(`${url}/updateRoom/${roomId}`, listener)
            socket.off(`${url}/getRoom/${user._id}`, firstTimeListener)
        }
    }, [socket, roomId, setRoom])
}
