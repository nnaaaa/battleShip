import { makeStyles } from '@mui/styles'

export const useStyle = makeStyles({
    title: {
        textAlign: 'center',
        marginBottom: 15,
        fontSize: 20,
        fontWeight: 'bold',
        userSelect: 'none',
    },
    group: {
        display: 'flex',
        flexDirection: 'row',
    },
    control: {
        display: 'flex',
        flexDirection: 'row',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        userSelect: 'none',
    },
})
