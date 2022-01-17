import { Box, Button } from '@mui/material'
import { IShip } from 'games/battleShip/modals/ship'
import { ShipCategoryManager } from 'games/battleShip/services/shipCategories/ship'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import { Dispatch, SetStateAction } from 'react'
import className from '../prepareStyle.module.css'

interface IGenerateShips {
    ShipFactory: ShipFactory
    setShips: Dispatch<SetStateAction<IShip[]>>
}

function GenerateShips({ ShipFactory, setShips }: IGenerateShips) {
    return (
        <Box display="flex" justifyContent="center" flexDirection="column">
            <p className={className.title}>Random</p>
            <Button
                color="primary"
                variant="contained"
                size="small"
                onClick={() => {
                    if (ShipFactory.getCategoryList().length === 0)
                        ShipFactory.clearShips()

                    setShips(ShipFactory.manufacture())
                }}
            >
                generate
            </Button>
        </Box>
    )
}

export default GenerateShips
