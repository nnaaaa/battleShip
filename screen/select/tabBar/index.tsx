import React, { Dispatch, SetStateAction } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import className from 'games/battleShip/battleShipStyles.module.css'

const useStyle = makeStyles({
    button: {
        textTransform: 'none',
    },
})

interface IHomeButtonProps {
    setIndex: Dispatch<SetStateAction<number>>
}

const HomeButton = ({ setIndex }: IHomeButtonProps) => {
    const style = useStyle()

    return (
        <Box mb={2}>
            <p className={className.hero}>Battle Ship</p>
            <Grid container spacing={1} justifyContent="center">
                <Grid item>
                    <Button
                        className={style.button}
                        onClick={() => setIndex(0)}
                        variant="contained"
                        color="primary"
                        size="large"
                    >
                        Create Room
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        className={style.button}
                        variant="contained"
                        color="secondary"
                        size="large"
                        onClick={() => setIndex(1)}
                    >
                        Join Room
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        className={style.button}
                        color="inherit"
                        variant="contained"
                        size="large"
                        onClick={() => setIndex(2)}
                    >
                        Watching
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default HomeButton
