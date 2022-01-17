import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
import Playing from '../../playing'
import { Empty, useStyle } from './styles'

const roomPerPage = 8

interface IJoinWatchProps {
    changeScreen: (NewScreen: typeof Screen) => void
}

const JoinWatching = ({ changeScreen }: IJoinWatchProps) => {
    const style = useStyle()
    const { listPlayingRoom, setRole, setRoomId, setRoom } = useContext(RoomContext)
    const { socket } = useContext(SocketContext)
    const user = useAppSelector((state) => state.user.current)
    const [curPage, setCurPage] = useState(0)

    const changePage = (e: ChangeEvent<unknown>, page: number) => setCurPage(page - 1)

    const joinToWatch = (room: IRoom) => {
        if (!setRole || !user || !socket || !setRoomId || !setRoom) return

        setRole('spectator')
        const newSpectator = [...room.spectators, user]
        socket.emit(`${url}/updateRoom`, { _id: room._id, spectators: newSpectator })
        setRoom(room)
        setRoomId(room._id)
        changeScreen(Playing)
    }

    return (
        <Grid container className={style.wrapper}>
            <Grid item xs={12}>
                <Typography className={style.title}>Chose your match</Typography>
            </Grid>
            {listPlayingRoom.length ? (
                <>
                    {listPlayingRoom
                        .slice(curPage * roomPerPage, (curPage + 1) * roomPerPage)
                        .map((room) => (
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
                                    onClick={() => joinToWatch(room)}
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
                                                <Typography className={style.name} noWrap>
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
                                                        // deleteIcon={<DoneIcon />}
                                                        onDelete={() => {}}
                                                    />
                                                    <Chip
                                                        label={`Limits: ${room.limitShip}`}
                                                        clickable
                                                        size="small"
                                                        // deleteIcon={<DoneIcon />}
                                                        onDelete={() => {}}
                                                        color="secondary"
                                                        variant="outlined"
                                                    />
                                                    <Chip
                                                        label={room.mode}
                                                        clickable
                                                        size="small"
                                                        // deleteIcon={<DoneIcon />}
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
                                                <Typography className={style.name} noWrap>
                                                    {room.player2.username}
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <Empty />
                                        )}
                                    </Box>
                                </Button>
                                <Button
                                    startIcon={<FontAwesomeIcon icon={faEye} />}
                                    color="inherit"
                                    className={style.stateBtn}
                                    size="small"
                                    variant="contained"
                                    onClick={() => joinToWatch(room)}
                                >
                                    Spectate
                                </Button>
                            </Grid>
                        ))}
                    <Pagination
                        count={Math.ceil(listPlayingRoom.length / roomPerPage)}
                        className={style.pagination}
                        onChange={changePage}
                    />
                </>
            ) : (
                <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button color="inherit" variant="contained">
                        😥 Empty
                    </Button>
                </Box>
            )}
        </Grid>
    )
}

export default JoinWatching
