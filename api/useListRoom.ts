import { ID } from 'models/common'
import { Dispatch, SetStateAction, useContext, useEffect } from 'react'
import { SocketContext } from 'states/context/socket'
import url from '.'
import { useAppSelector } from '../../../states/hooks'
import { IRoom } from '../modals/room'

export const useListRoom = (
    setListPlayingRoom: Dispatch<SetStateAction<IRoom[]>>,
    setListPrepareRoom: Dispatch<SetStateAction<IRoom[]>>
) => {
    const user = useAppSelector((state) => state.user.current)
    const { socket } = useContext(SocketContext)
    useEffect(() => {
        if (!socket || !user) return
        const getListRoom = async (listRoom: IRoom[]) => {
            if (!listRoom) return
            setListPlayingRoom(listRoom.filter((room) => room.isStarting))
            setListPrepareRoom(listRoom.filter((room) => !room.isStarting))
        }

        const createRoom = async (room: IRoom) => {
            if (!room) return
            setListPrepareRoom((pre) => {
                const newList = [...pre, room]
                return newList
            })
        }

        const updateRoom = async (room: Partial<IRoom>) => {
            if (!room) return
            setListPlayingRoom((pre) =>
                pre.map((r) => (r._id === room._id ? { ...r, ...room } : r))
            )
            setListPrepareRoom((pre) =>
                pre.map((r) => (r._id === room._id ? { ...r, ...room } : r))
            )
        }

        const deleteRoom = async (roomId: ID) => {
            if (!roomId) return
            setListPlayingRoom((pre) => pre.filter((r) => r._id !== roomId))
            setListPrepareRoom((pre) => pre.filter((r) => r._id !== roomId))
        }

        socket.on(`${url}/getListRoom/${user._id}`, getListRoom)
        socket.on(`${url}/updateRoom`, updateRoom)
        socket.on(`${url}/createRoom`, createRoom)
        socket.on(`${url}/deleteRoom`, deleteRoom)
        return () => {
            socket.off(`${url}/getListRoom/${user._id}`, getListRoom)
            socket.off(`${url}/updateRoom`, updateRoom)
            socket.off(`${url}/createRoom`, createRoom)
            socket.off(`${url}/deleteRoom`, deleteRoom)
        }
    }, [socket, user])
}
