import { Box, Grid } from '@mui/material'
import url from 'games/battleShip/api'
import ListSpectator from 'games/battleShip/components/listSpectator'
import Constants from 'games/battleShip/services/constants'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import React, { useContext, useEffect, useState } from 'react'
import Loading from 'screens/loading'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import Screen from '..'
import Waiting from '../waiting'
import OneAtlas from './atlas/oneAtlas'
import TwoAtlas from './atlas/twoAtlas'
import ChangeMode from './changeMode'
import Message from './message'
import { useEndGame } from './useEndGame'

class Playing extends Screen {
    render() {
        return (
            <>
                <this.BackToLobbyButton />
                <PlayingFunc state={this} />
            </>
        )
    }
}

export default Playing

const PlayingFunc = ({ state }: { state: Screen }) => {
    const [isSeeOneAtlas, setIsSeeOneAtlas] = useState(false)
    const { room } = useContext(RoomContext)
    const user = useAppSelector((state) => state.user.current)

    useEndGame(state.props.changeScreen)

    if (!room || !user) return <Loading />

    return (
        <Box width="100%" height="100%" p={5} bgcolor="#f2f5f6">
            <Message message={room.message} />
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                sx={{ height: '100%', width: '100%' }}
            >
                <Grid
                    item
                    md={2}
                    container
                    alignItems="flex-start"
                    style={{ height: '100%' }}
                >
                    <ListSpectator />
                </Grid>

                {isSeeOneAtlas ? (
                    <OneAtlas room={room} user={user} />
                ) : (
                    <TwoAtlas room={room} user={user} />
                )}

                <Grid
                    item
                    md={2}
                    container
                    alignItems="flex-start"
                    style={{ height: '100%' }}
                >
                    <ChangeMode
                        setIsSeeOneAtlas={setIsSeeOneAtlas}
                        isSeeOneAtlas={isSeeOneAtlas}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}
