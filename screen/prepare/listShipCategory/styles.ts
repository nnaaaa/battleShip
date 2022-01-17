import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    name: {
        cursor: 'pointer',
        userSelect: 'none',
        color: 'gray',
        textAlign: 'center',
        '&:hover': {
            opacity: 0.7,
        },
    },
})
