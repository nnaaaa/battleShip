import { Button } from '@mui/material'
import { IShip } from 'games/battleShip/modals/ship'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext } from 'react'
import { useAppSelector } from 'states/hooks'
import { SocketContext } from 'states/context/socket'

import url from 'games/battleShip/api'

function ReadyButton({ ships }: { ships: IShip[] }) {
    const user = useAppSelector((state) => state.user.current)
    const { room } = useContext(RoomContext)
    const { socket } = useContext(SocketContext)
    const ready = () => {
        if (!room || !user || !socket) return
        if (ships.length !== room.limitShip) return
        let arranged
        if (room.arranged.find((u) => u._id === user._id))
            arranged = room.arranged.filter((u) => u._id !== user._id)
        else arranged = [...room.arranged, user]
        socket.emit(`${url}/updateRoom`, {
            _id: room._id,
            arranged,
        })
    }

    if (!user || !room) return <></>

    return (
        <Button
            variant="contained"
            size="small"
            color={room.arranged.find((u) => u._id === user._id) ? 'inherit' : 'primary'}
            onClick={ready}
        >
            {room.arranged.find((u) => u._id === user._id) ? 'Cancel' : 'Done'}
        </Button>
    )
}

export default ReadyButton
