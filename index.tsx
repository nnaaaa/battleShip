import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, IconButton } from '@mui/material'
import Popup from 'components/popup'
import { Component } from 'react'
import Screen from './screen'
import Select from './screen/select'
import { RoomContext, RoomProvider } from './states/roomProvider'
interface IBattleShipProps {
    stopPlaying: () => void
}

interface IBattleShipStates {
    Screen: typeof Screen
}

const BattleShipWrapper = ({ stopPlaying }: IBattleShipProps) => {
    return (
        <RoomProvider>
            <BattleShip stopPlaying={stopPlaying} />
        </RoomProvider>
    )
}
export default BattleShipWrapper

class BattleShip extends Component<IBattleShipProps, IBattleShipStates> {
    static contextType = RoomContext
    constructor(props: IBattleShipProps) {
        super(props)
        this.state = {
            Screen: Select,
        }
    }

    onClose = () => {
        this.context.outRoom()
        this.props.stopPlaying()
    }

    changeScreen = (NewScreen: typeof Screen) => {
        this.setState({ Screen: NewScreen })
    }

    render() {
        return (
            <Popup open onClose={this.onClose}>
                <Box width="96vw" height="96vh" borderRadius={4} overflow="hidden">
                    <IconButton
                        onClick={this.onClose}
                        style={{ position: 'absolute', top: 5, right: 5 }}
                    >
                        <FontAwesomeIcon icon={faTimesCircle} />
                    </IconButton>

                    <this.state.Screen
                        changeScreen={this.changeScreen}
                        RoomContext={this.context}
                    />
                </Box>
            </Popup>
        )
    }
}
