import { Box, FormControl, FormControlLabel, Switch } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Dispatch, SetStateAction } from 'react'

const useStyle = makeStyles({
    option: {
        color: 'white',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
})

interface IChangeModeProps {
    setIsSeeOneAtlas: Dispatch<SetStateAction<boolean>>
    isSeeOneAtlas: boolean
}

const ChangeMode = ({ setIsSeeOneAtlas, isSeeOneAtlas }: IChangeModeProps) => {
    const style = useStyle()
    return (
        <Box bgcolor="primary.main" p={1} borderRadius={1}>
            <FormControl>
                <FormControlLabel
                    control={
                        <Switch
                            onChange={() => setIsSeeOneAtlas((pre) => !pre)}
                            color="default"
                        />
                    }
                    label={isSeeOneAtlas ? '1 atlas mode' : '2 atlas mode'}
                    className={style.option}
                />
            </FormControl>
        </Box>
    )
}

export default ChangeMode
