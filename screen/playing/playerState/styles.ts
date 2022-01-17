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
        width: 50,
        height: 50,
        borderRadius: 8,
        border: '1px solid gray',
    },
    name: {
        width: '100%',
        display: 'inline-block',
        userSelect: 'none',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
        color: 'black',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    state: {
        margin: 5,
        textTransform: 'none',
        width: '100%',
    },
})
