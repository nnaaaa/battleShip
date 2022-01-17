import { Avatar, Box, Button, Typography } from '@mui/material'
import { IPublicInfo } from 'models/user'
import { useStyle } from './styles'

interface IFilledSlot {
    userReady: IPublicInfo[]
    player: IPublicInfo
}

function FilledSlot({ userReady, player }: IFilledSlot) {
    const style = useStyle()
    return (
        <Box
            overflow="hidden"
            width="20%"
            justifyContent="center"
            display="flex"
            flexDirection="column"
            alignItems="center"
        >
            <Box borderRadius={8} display="flex" justifyContent="center">
                <Avatar variant="square" src={player.avatar} className={style.avatar} />
            </Box>
            <Typography className={style.name}>{player.username}</Typography>
            <Button
                className={style.state}
                variant="contained"
                disableElevation
                color={
                    userReady.find((u) => u._id === player._id) ? 'primary' : 'inherit'
                }
            >
                {userReady.find((u) => u._id === player._id) ? 'Ready' : 'Prepare'}
            </Button>
        </Box>
    )
}

export default FilledSlot
