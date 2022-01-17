import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    info: {
        margin: '0 10px 10px 0',
    },
    tool: {
        backgroundColor: '#f0daee',
        padding: 10,
        borderRadius: 8,
    },
    avatar: {
        borderRadius: 8,
        border: '1px solid gray',
    },
    name: {
        display: 'inline-block',
        userSelect: 'none',
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center',
        color: 'black',
    },
    state: {
        margin: 5,
        textTransform: 'none',
    },
})
