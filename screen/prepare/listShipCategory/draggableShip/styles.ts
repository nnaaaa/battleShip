import { pink } from '@mui/material/colors'
import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    remove: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        borderRadius: '50%',
        transform: 'translate(-50%,-50%)',
        cursor: 'pointer',
        zIndex: 20001,
        backgroundColor: pink[300],
        color: 'white',
    },
    hovered: {
        border: '3px dashed gray',
    },
    unhover: {
        backgroundColor: 'transparent',
    },
})
