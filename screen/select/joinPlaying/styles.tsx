import { Avatar, Box, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles((theme: any) => ({
    wrapper: {
        padding: 10,
    },
    room: {
        padding: 0,
        width: '100%',
    },
    roomWrapper: {
        padding: '10px 5px',
    },
    listInfo: {
        '&>*': {
            margin: theme.spacing(0.5),
        },
    },
    title: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 20,
        fontWeight: 'bold',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 8,
        margin: '0 auto',
    },
    name: {
        userSelect: 'none',
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
        color: 'gray',
    },
    stateBtn: {
        margin: '5 auto',
        width: '100%',
        textTransform: 'none',
    },
    pagination: {
        margin: '0 auto',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
}))

export const Empty = () => {
    const style = useStyle()
    return (
        <Box width="20%">
            <Box borderRadius={8} display="flex" justifyContent="center">
                <Avatar variant="square" className={style.avatar} />
            </Box>
            <Typography className={style.name}>??? </Typography>
        </Box>
    )
}
