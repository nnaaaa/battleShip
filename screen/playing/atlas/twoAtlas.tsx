import { Grid } from '@mui/material'
import HiddenAtlas from 'games/battleShip/components/map/hiddenAtlas'
import SensorAtlas from 'games/battleShip/components/map/sensorAtlas'
import { IRoom } from 'games/battleShip/modals/room'
import { IPublicInfo } from 'models/user'
import PlayerState from '../playerState'

function TwoAtlas({ room, user }: { room: IRoom; user: IPublicInfo }) {
    const isPlayer1 = user._id === room.player1?._id
    const isPlayer2 = user._id === room.player2?._id
    const isSpectator = !isPlayer1 && !isPlayer2

    return (
        <>
            <Grid
                item
                md={4}
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
            >
                <PlayerState player={room.player1} room={room} />
                {isPlayer1 && (
                    <SensorAtlas
                        sensors={room.sensors1}
                        ships={room.ships1}
                        size={room.atlasSize}
                    />
                )}
                {isPlayer2 && (
                    <HiddenAtlas sensors={room.sensors1} size={room.atlasSize} />
                )}
                {isSpectator && (
                    <SensorAtlas
                        sensors={room.sensors1}
                        ships={room.ships1}
                        size={room.atlasSize}
                    />
                )}
            </Grid>
            <Grid
                item
                md={4}
                xs={12}
                container
                justifyContent="center"
                alignItems="center"
                direction="column"
            >
                <PlayerState player={room.player2} room={room} />
                {isPlayer2 && (
                    <SensorAtlas
                        sensors={room.sensors2}
                        ships={room.ships2}
                        size={room.atlasSize}
                    />
                )}
                {isPlayer1 && (
                    <HiddenAtlas sensors={room.sensors2} size={room.atlasSize} />
                )}
                {isSpectator && (
                    <SensorAtlas
                        sensors={room.sensors2}
                        ships={room.ships2}
                        size={room.atlasSize}
                    />
                )}
            </Grid>
        </>
    )
}

export default TwoAtlas
