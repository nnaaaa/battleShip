import { Avatar, Box, Button, Typography } from '@mui/material'
import { IRoom } from 'games/battleShip/modals/room'
import { IPublicInfo } from 'models/user'
import { useStyle } from './styles'

const PlayerState = ({
    player,
    room,
}: {
    player: IPublicInfo | undefined
    room: IRoom
}) => {
    const style = useStyle()
    const nameSplit = player?.username?.split(' ')
    let firstName = nameSplit?.[nameSplit?.length ? nameSplit?.length - 1 : 0]?.slice(
        0,
        7
    )

    return (
        <Box
            width={150}
            overflow="hidden"
            justifyContent="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Box
                borderRadius={8}
                display="flex"
                justifyContent="center"
                width="min-content"
            >
                <Avatar variant="square" src={player?.avatar} className={style.avatar} />
            </Box>
            <Typography className={style.name} gutterBottom>
                {player?.username || 'Unknown'}
            </Typography>

            <Box
                display="flex"
                width="200%"
                ml={0}
                flexDirection={room.player1?._id === player?._id ? 'row-reverse' : 'row'}
                style={{
                    transform: `translateX(${
                        room.player1?._id === player?._id
                            ? room.turn === player?._id
                                ? '-25%'
                                : '25%'
                            : room.turn === player?._id
                            ? '25%'
                            : '-25%'
                    })`,
                    transition: '0.3s',
                }}
            >
                <Button
                    className={style.state}
                    variant="contained"
                    disableElevation
                    color="primary"
                >
                    {firstName}'s turn
                </Button>

                <Button
                    className={style.state}
                    variant="contained"
                    disableElevation
                    color="inherit"
                >
                    Waiting
                </Button>
            </Box>
        </Box>
    )
}

export default PlayerState
