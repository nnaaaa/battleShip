import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Typography } from '@mui/material'
import url from 'games/battleShip/api'
import { IRole, IRoom } from 'games/battleShip/modals/room'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import { useStyle } from './styles'

const EmptySlot = ({ player }: { player: IRole }) => {
    const style = useStyle()
    const user = useAppSelector((state) => state.user.current)
    const { socket } = useContext(SocketContext)
    const { room, setRole } = useContext(RoomContext)

    const joinPlay = () => {
        if (!user || !room || !setRole || !socket) return
        if (player === 'player1') {
            setRole('player1')
            if (user._id === room.player2?._id) {
                const spectators = room.spectators.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    spectators,
                    player1: user,
                }
                socket.emit(`${url}/player2_switch_player1`, updateRoom)
            } else {
                const spectators = room.spectators.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    spectators,
                    player1: user,
                }
                socket.emit(`${url}/spectator_switch_player1`, updateRoom)
            }
        } else if (player === 'player2') {
            setRole('player2')
            if (user._id === room.player1?._id) {
                const spectators = room.spectators.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    spectators,
                    player2: user,
                }
                socket.emit(`${url}/player1_switch_player2`, updateRoom)
            } else {
                const spectators = room.spectators.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    spectators,
                    player2: user,
                }
                socket.emit(`${url}/spectator_switch_player2`, updateRoom)
            }
        }
    }

    return (
        <Box width="20%" display="flex" flexDirection="column" alignItems="center">
            <Box
                borderRadius={8}
                display="flex"
                justifyContent="center"
                alignItems="center"
                className={style.avatar}
                onClick={() => joinPlay()}
            >
                <FontAwesomeIcon icon={faPlus} color="inherit" />
            </Box>
            <Typography className={style.name}>???</Typography>
            <Button
                className={style.state}
                variant="contained"
                disableElevation
                color="inherit"
            >
                Waiting
            </Button>
        </Box>
    )
}

export default EmptySlot
