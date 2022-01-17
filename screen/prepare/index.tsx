import { Box, Button, Grid } from '@mui/material'
import globalStyle from 'games/battleShip/battleShipStyles.module.css'
import Loading from 'games/battleShip/components/loading'
import DraggableAtlas from 'games/battleShip/components/map/draggableAtlas'
import useDraggable from 'games/battleShip/components/map/draggableAtlas/useDraggable'
import { IShip } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'
import { ShipCategoryManager as ShipCtgMng } from 'games/battleShip/services/shipCategories/ship'
import EightShipFactory from 'games/battleShip/services/shipFactories/eightShipFactory'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import SixShipFactory from 'games/battleShip/services/shipFactories/sixShipFactory'
import ThreeShipFactory from 'games/battleShip/services/shipFactories/threeShipFactory'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Screen from '..'
import Waiting from '../waiting'
import ClearButton from './clearButton'
import GenerateShip from './generateShip'
import GenerateShips from './generateShips'
import ListShipCategory from './listShipCategory'
import PlayersState from './playersState'
import ReadyButton from './readyButton'
import SelectDirection, { useInitDirection } from './selectDirection'
import { useStyle } from './styles'
import { usePrepared } from './usePrepared'

class Prepare extends Screen {
    render() {
        return (
            <>
                <this.BackToLobbyButton />
                <PrepareFunc state={this} />
            </>
        )
    }
}

export default Prepare

const PrepareFunc = ({ state }: { state: Screen }) => {
    const style = useStyle()
    const { room, role } = useContext(RoomContext)
    const [ShipFactory, setShipFactory] = useState<ShipFactory>()
    const [shipCategoryManager, setShipCategoryManager] = useState<ShipCtgMng[]>([])
    const [ships, setShips] = useState<IShip[]>([])

    const [direction, setDirection] = useInitDirection()
    const dragTool = useDraggable(ShipFactory)

    //sắp xếp xong thì game bắt đầu
    usePrepared(ships, state.props.changeScreen)

    //khởi tạo ShipFactory
    useEffect(() => {
        if (!room) return
        let shipFactory: ShipFactory

        if (room.atlasSize > 10) Constants.setBoardSize(22)
        if (room.limitShip > 3) Constants.setMaxShipSize(6)

        if (room.limitShip === 3) shipFactory = new ThreeShipFactory(room.atlasSize)
        else if (room.limitShip === 6) shipFactory = new SixShipFactory(room.atlasSize)
        else shipFactory = new EightShipFactory(room.atlasSize)

        setShipFactory(shipFactory)
        setShipCategoryManager(shipFactory.getManagerList())
    }, [room?.limitShip, room?.atlasSize])

    //khi ships thay đổi cập nhật lại shipCategoryManager
    useLayoutEffect(() => {
        if (!ShipFactory) return
        setShipCategoryManager(ShipFactory.getManagerList())
    }, [ships, ShipFactory])

    //nếu thiếu 1 trong 2 player sẽ direct về phòng chờ
    useLayoutEffect(() => {
        if (!room) return
        if (!room.player1 || !room.player2) state.props.changeScreen(Waiting)
    }, [room])

    if (!room || !role || !ShipFactory) return <Loading />

    //nếu là người xem thì chờ người chơi sắp xếp tàu
    if (role === 'spectator') return <PlayersState />

    return (
        <Box
            p={5}
            display="flex"
            justifyContent="center"
            width="100%"
            height="100%"
            alignItems="center"
            bgcolor="#F2F5F6"
        >
            <p className={globalStyle.smallHero}>Battle Ship</p>

            <Grid container justifyContent="space-evenly">
                <Grid item xs={5} className={style.toolLeft} container direction="column">
                    <Box>
                        <Button variant="outlined" color="primary" className={style.info}>
                            Size: {room.atlasSize}
                        </Button>
                        <Button
                            variant={
                                ships.length === room.limitShip ? 'contained' : 'outlined'
                            }
                            color="primary"
                            className={style.info}
                        >
                            Limits: {ships.length}/{room.limitShip}
                        </Button>
                    </Box>
                    <DraggableAtlas
                        dragTool={dragTool}
                        ships={ships}
                        setShips={setShips}
                        room={room}
                        ShipFactory={ShipFactory}
                    />
                    <Box mt={2} display="flex">
                        <ReadyButton ships={ships} />
                    </Box>
                    <PlayersState />
                </Grid>
                <Grid item xs={5}>
                    <ListShipCategory
                        direction={direction.value}
                        shipCategoryManager={shipCategoryManager}
                        ShipFactory={ShipFactory}
                        dragTool={dragTool}
                        setShips={setShips}
                    />
                </Grid>
                <Grid item container xs={2} className={style.toolRight} spacing={1}>
                    <Grid item xs={12}>
                        <SelectDirection
                            direction={direction}
                            setDirection={setDirection}
                        />
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <ClearButton setShips={setShips} ShipFactory={ShipFactory} />
                    </Grid>
                    <Grid item xs={12} lg={8}>
                        <GenerateShips ShipFactory={ShipFactory} setShips={setShips} />
                    </Grid>
                    <Grid item xs={12}>
                        <GenerateShip
                            ShipFactory={ShipFactory}
                            setShips={setShips}
                            shipCategoryManager={shipCategoryManager}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}
