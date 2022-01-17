import { Avatar, Box, Button, Typography } from '@mui/material'
import Loading from 'games/battleShip/components/loading'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext } from 'react'
import { useStyle } from './styles'

interface IPlayersStateProps {}

const PlayerState = (props: IPlayersStateProps) => {
    const style = useStyle()
    const { room, role } = useContext(RoomContext)
    const player1 = room?.player1
    const player2 = room?.player2

    if (!room || !player1 || !player2) return <></>

    return (
        <Box
            sx={{ width: { xs: '100%', lg: '70%' } }}
            display="flex"
            justifyContent="center"
            alignContent="center"
            bgcolor={role !== 'spectator' ? 'transparent' : 'primary.main'}
            height={role !== 'spectator' ? 'auto' : '100%'}
        >
            <Box
                width={role !== 'spectator' ? '100%' : '30%'}
                mt={4}
                display="flex"
                justifyContent="space-evenly"
            >
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
                        <Avatar
                            variant="square"
                            src={player1.avatar}
                            className={style.avatar}
                        />
                    </Box>
                    <Typography className={style.name} gutterBottom noWrap>
                        {player1.username}
                    </Typography>
                    <Button
                        className={style.state}
                        variant="contained"
                        disableElevation
                        color={
                            room.arranged.find((u) => u._id === player1._id)
                                ? 'secondary'
                                : 'inherit'
                        }
                    >
                        {room.arranged.find((u) => u._id === player1._id)
                            ? 'Done'
                            : 'Arranging'}
                    </Button>
                </Box>
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
                        <Avatar
                            variant="square"
                            src={player2.avatar}
                            className={style.avatar}
                        />
                    </Box>
                    <Typography className={style.name} gutterBottom noWrap>
                        {player2.username}
                    </Typography>
                    <Button
                        className={style.state}
                        variant="contained"
                        disableElevation
                        color={
                            room.arranged.find((u) => u._id === player2._id)
                                ? 'primary'
                                : 'inherit'
                        }
                    >
                        {room.arranged.find((u) => u._id === player2._id)
                            ? 'Done'
                            : 'Arranging'}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default PlayerState
