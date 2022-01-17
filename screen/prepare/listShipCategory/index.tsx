import { Box, Grid, Typography } from '@mui/material'
import Water from 'games/battleShip/components/map/background/water'
import useDraggable from 'games/battleShip/components/map/draggableAtlas/useDraggable'
import { IShip, IShipDirection } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'
import { ShipCategoryManager } from 'games/battleShip/services/shipCategories/ship'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import { Dispatch, SetStateAction } from 'react'
import className from '../prepareStyle.module.css'
import DraggableShip from './draggableShip'
import { useStyle } from './styles'

interface IListShipCategoryProps {
    direction: IShipDirection
    shipCategoryManager: ShipCategoryManager[]
    ShipFactory: ShipFactory
    dragTool: ReturnType<typeof useDraggable>
    setShips: Dispatch<SetStateAction<IShip[]>>
}

function ListShipCategory(props: IListShipCategoryProps) {
    const style = useStyle()
    const { shipCategoryManager, direction, ShipFactory, dragTool, setShips } = props

    return (
        <>
            <p className={className.title}>Categories</p>
            <Grid container spacing={2}>
                {shipCategoryManager.map((manager, i) => {
                    const ship = ShipFactory.createRepresentShip(manager.name, direction)
                    if (!ship) return <></>
                    const { height, width } = ship.size
                    return (
                        <Grid
                            item
                            key={'listShipCatgory' + i}
                            xs={6}
                            lg={4}
                            container
                            justifyContent="center"
                            alignItems="center"
                            direction="column"
                        >
                            <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
                                <Water size={Constants.maxShipSize}>
                                    <DraggableShip
                                        representShip={ship}
                                        dragTool={dragTool}
                                        setShips={setShips}
                                        ShipFactory={ShipFactory}
                                    />
                                </Water>
                            </Box>

                            <Typography
                                className={style.name}
                                onClick={() => {
                                    ShipFactory.createShipByRand(manager.name)
                                    setShips(ShipFactory.getShips())
                                }}
                            >
                                {ship.name} ({width}x{height})
                            </Typography>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default ListShipCategory
