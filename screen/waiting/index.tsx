import { Box, Button, ButtonGroup, Typography } from '@mui/material'
import url from 'games/battleShip/api'
import className from 'games/battleShip/battleShipStyles.module.css'
import ListSpectator from 'games/battleShip/components/listSpectator'
import Loading from 'games/battleShip/components/loading'
import ShipAtlas from 'games/battleShip/components/map/shipAtlas'
import { IRoom } from 'games/battleShip/modals/room'
import { IShip } from 'games/battleShip/modals/ship'
import EmptySlot from 'games/battleShip/screen/waiting/emptySlot'
import {
    default as BattleShipGameService,
    default as BattleShipService,
} from 'games/battleShip/services'
import Constants from 'games/battleShip/services/constants'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext, useEffect, useLayoutEffect, useMemo } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import Screen from '../'
import CountDown from '../countDown'
import Prepare from '../prepare'
import Select from '../select'
import FilledSlot from './filledSlot'
import { useStyle } from './styles'

class Waiting extends Screen {
    render() {
        return (
            <>
                <this.BackToLobbyButton />
                <WaitingFunc state={this} />
            </>
        )
    }
}

export default Waiting

const WaitingFunc = ({ state }: { state: Select }) => {
    const style = useStyle()
    const { room, role } = useContext(RoomContext)
    const { socket } = useContext(SocketContext)
    const user = useAppSelector((state) => state.user.current)

    const randShips = useMemo<IShip[]>(() => {
        if (!room) return []
        return BattleShipGameService.initShips(room.limitShip, room.atlasSize)
    }, [room?.limitShip, room?.atlasSize])

    const readyToPlay = () => {
        if (!room || !user || !socket) return
        if (room.userReady.find((u) => u._id === user._id)) {
            const userReady = room.userReady.filter((u) => u._id !== user._id)
            const updateRoom: Partial<IRoom> = {
                _id: room._id,
                userReady,
            }
            socket.emit(`${url}/updateRoom`, updateRoom)
        } else {
            const userReady = [...room.userReady, user]
            const updateRoom: Partial<IRoom> = {
                _id: room._id,
                userReady,
            }
            socket.emit(`${url}/updateRoom`, updateRoom)
        }
    }

    //tất cả người chơi sẵn sàng sẽ bắt đầu game
    useLayoutEffect(() => {
        if (!room || !user || !socket) return
        if (room.userReady.length !== 2) return
        const setPlayGame = async () => {
            if (room.mode === 'random') {
                if (user._id === room.player1?._id) {
                    const roomUpdate: Partial<IRoom> = {
                        _id: room._id,
                        isStarting: true,
                        turn: user._id,
                        ships1: BattleShipService.initShips(
                            room.limitShip,
                            room.atlasSize
                        ),
                        sensors1: BattleShipService.initSensorTiles(room.atlasSize),
                    }
                    socket.emit(`${url}/updateRoom`, roomUpdate)
                } else if (user._id === room.player2?._id) {
                    const roomUpdate: Partial<IRoom> = {
                        _id: room._id,
                        ships2: BattleShipService.initShips(
                            room.limitShip,
                            room.atlasSize
                        ),
                        sensors2: BattleShipService.initSensorTiles(room.atlasSize),
                    }
                    socket.emit(`${url}/updateRoom`, roomUpdate)
                }
                state.props.changeScreen(CountDown)
            } else {
                state.props.changeScreen(Prepare)
            }
        }
        setPlayGame().then(() => {})
    }, [room, user])

    useEffect(() => {
        if (!room) return
        if (room.atlasSize > 10) Constants.setBoardSize(22)
    }, [room?.atlasSize])

    if (!room || !user) return <Loading />

    return (
        <Box
            p={2}
            width="100%"
            height="100%"
            display="flex"
            bgcolor="#F2F5F6"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <p className={className.smallHero}>Battle Ship</p>

            <Box width="15%">
                <ListSpectator joinable />
            </Box>

            {room.player1 ? (
                <FilledSlot player={room.player1} userReady={room.userReady} />
            ) : (
                <EmptySlot player="player1" />
            )}

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                maxWidth="40%"
            >
                <ButtonGroup className={style.listInfo}>
                    <Button variant="outlined" color="primary">
                        Size: {room.atlasSize}x{room.atlasSize}
                    </Button>
                    <Button variant="outlined" color="primary">
                        Limits: {room.limitShip}
                    </Button>
                    <Button variant="outlined" color="primary">
                        {room.mode}
                    </Button>
                </ButtonGroup>

                <ShipAtlas ships={randShips} size={room.atlasSize} />

                {role !== 'spectator' ? (
                    <Box className={style.ready}>
                        <Button
                            variant="contained"
                            color={
                                room.userReady.find((u) => u._id === user._id)
                                    ? 'inherit'
                                    : 'secondary'
                            }
                            onClick={readyToPlay}
                        >
                            {room.userReady.find((u) => u._id === user._id)
                                ? 'Cancel'
                                : 'Ready'}
                        </Button>
                    </Box>
                ) : (
                    <Box className={style.ready}>
                        <Button
                            variant="contained"
                            disabled
                            style={{ textTransform: 'none' }}
                        >
                            <Typography>Waiting for 2 player ready ..</Typography>
                        </Button>
                    </Box>
                )}
            </Box>

            {room.player2 ? (
                <FilledSlot player={room.player2} userReady={room.userReady} />
            ) : (
                <EmptySlot player="player2" />
            )}
        </Box>
    )
}

//   export default Waiting
