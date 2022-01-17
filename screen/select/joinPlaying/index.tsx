import { faEye, faGamepad } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DoneIcon from '@mui/icons-material/Done'
import {
    Avatar,
    Box,
    Button,
    Chip,
    Grid,
    Hidden,
    Pagination,
    Typography,
} from '@mui/material'
import url from 'games/battleShip/api'
import { IRoom } from 'games/battleShip/modals/room'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { ChangeEvent, useContext, useState } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import Screen from '../..'
import Waiting from '../../waiting'
import { Empty, useStyle } from './styles'

const roomPerPage = 8
interface IJoinPlayingProps {
    changeScreen: (NewScreen: typeof Screen) => void
}
const JoinPlaying = ({ changeScreen }: IJoinPlayingProps) => {
    const style = useStyle()
    const { listPrepareRoom, setRole, setRoomId, setRoom } = useContext(RoomContext)
    const user = useAppSelector((state) => state.user.current)
    const { socket } = useContext(SocketContext)

    const [curPage, setCurPage] = useState(0)

    const changePage = (e: ChangeEvent<unknown>, page: number) => setCurPage(page - 1)

    const joinRoomToPlay = (room: IRoom) => {
        if (!setRole || !user || !socket || !setRoomId || !setRoom) return

        if (!room.player1) {
            setRole('player1')
            socket.emit(`${url}/updateRoom`, { _id: room._id, player1: user })
        } else if (!room.player2) {
            setRole('player2')
            socket.emit(`${url}/updateRoom`, { _id: room._id, player2: user })
        } else {
            setRole('spectator')
            const newSpectator = [...room.spectators, user]
            socket.emit(`${url}/updateRoom`, { _id: room._id, spectators: newSpectator })
        }
        setRoom(room)
        setRoomId(room._id)
        changeScreen(Waiting)
    }

    return (
        <Grid container className={style.wrapper}>
            <Grid item xs={12}>
                <Typography className={style.title}>Chose your room</Typography>
            </Grid>
            {listPrepareRoom.length ? (
                <>
                    {listPrepareRoom
                        .slice(curPage * roomPerPage, (curPage + 1) * roomPerPage)
                        .map((room) => {
                            const isFull = room.player1 && room.player2
                            return (
                                <Grid
                                    key={`btship_room ${room._id}`}
                                    item
                                    md={3}
                                    xs={6}
                                    container
                                    justifyContent="flex-start"
                                    className={style.roomWrapper}
                                >
                                    <Button
                                        color="secondary"
                                        variant="outlined"
                                        className={style.room}
                                        onClick={() => joinRoomToPlay(room)}
                                    >
                                        <Box
                                            p={2}
                                            display="flex"
                                            alignItems="center"
                                            width="100%"
                                            justifyContent="space-between"
                                        >
                                            {room.player1 ? (
                                                <Box width="20%">
                                                    <Box borderRadius={8}>
                                                        <Avatar
                                                            variant="square"
                                                            src={room.player1.avatar}
                                                            className={style.avatar}
                                                        />
                                                    </Box>
                                                    <Typography
                                                        className={style.name}
                                                        noWrap
                                                    >
                                                        {room.player1.username}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Empty />
                                            )}

                                            <Hidden smDown>
                                                <Box
                                                    display="flex"
                                                    flexDirection="column"
                                                    width="60%"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                >
                                                    <Box className={style.listInfo}>
                                                        <Chip
                                                            label={`Size: ${room.atlasSize}`}
                                                            clickable
                                                            size="small"
                                                            color="secondary"
                                                            variant="outlined"
                                                            deleteIcon={<DoneIcon />}
                                                            onDelete={() => {}}
                                                        />
                                                        <Chip
                                                            label={`Limits: ${room.limitShip}`}
                                                            clickable
                                                            size="small"
                                                            deleteIcon={<DoneIcon />}
                                                            onDelete={() => {}}
                                                            color="secondary"
                                                            variant="outlined"
                                                        />
                                                        <Chip
                                                            label={room.mode}
                                                            clickable
                                                            size="small"
                                                            deleteIcon={<DoneIcon />}
                                                            onDelete={() => {}}
                                                            color="secondary"
                                                            variant="outlined"
                                                        />
                                                    </Box>
                                                </Box>
                                            </Hidden>

                                            {room.player2 ? (
                                                <Box overflow="hidden" width="20%">
                                                    <Box borderRadius={8}>
                                                        <Avatar
                                                            variant="square"
                                                            src={room.player2.avatar}
                                                            className={style.avatar}
                                                        />
                                                    </Box>
                                                    <Typography
                                                        className={style.name}
                                                        noWrap
                                                    >
                                                        {room.player2.username}
                                                    </Typography>
                                                </Box>
                                            ) : (
                                                <Empty />
                                            )}
                                        </Box>
                                    </Button>
                                    <Button
                                        startIcon={
                                            <FontAwesomeIcon
                                                icon={isFull ? faEye : faGamepad}
                                            />
                                        }
                                        color={isFull ? 'inherit' : 'secondary'}
                                        className={style.stateBtn}
                                        size="small"
                                        variant="contained"
                                        onClick={() => joinRoomToPlay(room)}
                                    >
                                        {isFull ? 'Spectate' : 'Join to play'}
                                    </Button>
                                </Grid>
                            )
                        })}
                    <Pagination
                        count={Math.ceil(listPrepareRoom.length / roomPerPage)}
                        className={style.pagination}
                        onChange={changePage}
                        color="secondary"
                    />
                </>
            ) : (
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button color="secondary" variant="contained">
                        😥 Empty
                    </Button>
                </Box>
            )}
        </Grid>
    )
}

export default JoinPlaying
