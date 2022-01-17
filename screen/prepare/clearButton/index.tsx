import { Box, Button } from '@mui/material'
import { IShip } from 'games/battleShip/modals/ship'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import { Dispatch, SetStateAction } from 'react'
import className from '../prepareStyle.module.css'

interface IClearButtonProps {
    setShips: Dispatch<SetStateAction<IShip[]>>
    ShipFactory: ShipFactory
}

function ClearButton({ setShips, ShipFactory }: IClearButtonProps) {
    return (
        <Box display="flex" justifyContent="center" flexDirection="column">
            <p className={className.title}>Reset</p>
            <Button
                variant="contained"
                size="small"
                onClick={() => {
                    setShips([])
                    ShipFactory.clearShips()
                }}
            >
                Clear
            </Button>
        </Box>
    )
}

export default ClearButton
