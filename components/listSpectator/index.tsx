import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Box, Button, Typography } from '@mui/material'
import url from 'games/battleShip/api'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import Loading from '../loading'
import { useStyle } from './styles'

interface IListSpectatorProps {
    joinable?: boolean
}

const ListSpectator = ({ joinable }: IListSpectatorProps) => {
    const style = useStyle()
    const { room, setRole } = useContext(RoomContext)
    const { socket } = useContext(SocketContext)
    const user = useAppSelector((state) => state.user.current)

    const joinSpectate = async () => {
        if (!user || !room || !setRole || !socket) return

        if (room.player1?._id === user._id) {
            setRole('spectator')
            const spectators = [...room.spectators, room.player1]
            const userReady = room.userReady.filter((u) => u._id !== user._id)
            socket.emit(`${url}/player1_switch_spectator`, {
                _id: room._id,
                spectators,
                userReady,
            })
        } else if (room.player2?._id === user._id) {
            setRole('spectator')
            const spectators = [...room.spectators, room.player2]
            const userReady = room.userReady.filter((u) => u._id !== user._id)
            socket.emit(`${url}/player2_switch_spectator`, {
                _id: room._id,
                spectators,
                userReady,
            })
        }
    }

    if (!user || !room) return <Loading />

    return (
        <>
            <Box className={style.spectators} bgcolor="primary.main">
                <Box p={1}>
                    <Typography className={style.title}>
                        <FontAwesomeIcon icon={faEye} />
                        &nbsp;{room.spectators?.length}&nbsp;spectators
                    </Typography>
                </Box>
                {room.spectators?.map((user) => (
                    <Box
                        key={'spectator' + user._id}
                        display="flex"
                        className={style.spectator}
                        p={1}
                        alignItems="center"
                    >
                        <Avatar
                            alt={user._id}
                            src={user.avatar}
                            style={{ marginRight: 10 }}
                        />
                        <Typography className={style.name}>{user.username}</Typography>
                    </Box>
                ))}
            </Box>
            {joinable && (
                <Button
                    className={style.btn}
                    onClick={joinSpectate}
                    disabled={
                        !(
                            room.player1?._id === user._id ||
                            room.player2?._id === user._id
                        )
                    }
                    color="primary"
                    variant="contained"
                >
                    Spectate
                </Button>
            )}
        </>
    )
}

export default ListSpectator
