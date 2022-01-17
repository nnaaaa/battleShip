import { Avatar, Box, Button } from '@mui/material'
import icon from 'games/battleShip/assets/miniIcon.png'
import { IMessage } from 'games/battleShip/modals/room'

const Message = ({ message }: { message: IMessage | undefined }) => {
    return (
        <Box width="100%" display="flex" justifyContent="center">
            <Button
                startIcon={
                    message ? (
                        <Avatar src={message?.owner?.avatar} />
                    ) : (
                        <Avatar src={icon} />
                    )
                }
                disableElevation
                variant="contained"
                color={
                    message
                        ? message?.content?.search('winner') >= 0
                            ? 'warning'
                            : message?.content?.search('hit') >= 0
                            ? 'success'
                            : 'primary'
                        : 'inherit'
                }
                style={{ textTransform: 'none' }}
            >
                {message
                    ? message.owner.username + ' ' + message.content
                    : 'Break this peaceful scene !'}
            </Button>
        </Box>
    )
}

export default Message
