import { SettingsRemoteOutlined } from '@mui/icons-material'
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material'
import url from 'games/battleShip/api'
import ShipAtlas from 'games/battleShip/components/map/shipAtlas'
import { IMode, IRoom } from 'games/battleShip/modals/room'
import { IAtlatSize, ILimitShip } from 'games/battleShip/modals/state'
import BattleShipGameService from 'games/battleShip/services'
import { RoomContext } from 'games/battleShip/states/roomProvider'
import { useContext, useMemo, useState } from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import Screen from '../../'
import Waiting from '../../waiting'
import { useStyle } from './styles'

interface ICreateRoomProps {
    changeScreen: (NewScreen: typeof Screen) => void
}

const CreateRoom = ({ changeScreen }: ICreateRoomProps) => {
    const style = useStyle()
    const user = useAppSelector((state) => state.user.current)
    const { setRole } = useContext(RoomContext)
    const { socket } = useContext(SocketContext)

    const [loading, setLoading] = useState(false)
    const [size, setSize] = useState<IAtlatSize>(10)
    const [limits, setLimits] = useState<ILimitShip>(3)
    const [mode, setMode] = useState<IMode>('random')

    const randShips = useMemo(
        () => BattleShipGameService.initShips(limits, size),
        [size, limits]
    )
    const createRoom = () => {
        try {
            if (!user || !socket || !setRole) return
            setLoading(true)
            const room: Partial<IRoom> = {
                limitShip: limits,
                atlasSize: size,
                mode,
                player1: user,
            }
            socket.emit(`${url}/createRoom`, room, user._id)
            setRole('player1')
            setLoading(false)
            changeScreen(Waiting)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12}>
                <Typography className={style.title}>Select your rule</Typography>
            </Grid>
            <Grid item xs={3} container direction="column">
                <FormControl component="fieldset">
                    <FormLabel component="legend" className={style.label}>
                        Map Size
                    </FormLabel>
                    <RadioGroup
                        className={style.group}
                        onChange={(e) => setSize(+e.target.value as IAtlatSize)}
                        defaultValue="10"
                    >
                        <FormControlLabel value="10" control={<Radio />} label="10" />
                        <FormControlLabel value="15" control={<Radio />} label="15" />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend" className={style.label}>
                        Limits
                    </FormLabel>
                    <RadioGroup
                        className={style.group}
                        onChange={(e) => setLimits(+e.target.value as ILimitShip)}
                        defaultValue="3"
                    >
                        <FormControlLabel
                            value="3"
                            control={<Radio color="primary" />}
                            label="3 ship"
                        />
                        <FormControlLabel
                            value="6"
                            control={<Radio color="primary" />}
                            label="6 ship"
                        />
                        <FormControlLabel
                            value="8"
                            control={<Radio color="primary" />}
                            label="8 ship"
                        />
                    </RadioGroup>
                </FormControl>
                <FormControl component="fieldset">
                    <FormLabel component="legend" className={style.label}>
                        Arrange
                    </FormLabel>
                    <RadioGroup
                        className={style.group}
                        onChange={(e) => setMode(e.target.value as IMode)}
                        defaultValue="random"
                    >
                        <FormControlLabel
                            value="random"
                            control={<Radio color="primary" />}
                            label="random"
                        />
                        <FormControlLabel
                            value="select"
                            control={<Radio color="primary" />}
                            label="select"
                        />
                    </RadioGroup>
                </FormControl>
                <Box width="100%" display="flex" justifyContent="flex-end">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={createRoom}
                        disabled={loading}
                        size="small"
                        style={{ textTransform: 'none', margin: 20 }}
                    >
                        Create
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <ShipAtlas ships={randShips} size={size} />
            </Grid>
        </Grid>
    )
}

export default CreateRoom
