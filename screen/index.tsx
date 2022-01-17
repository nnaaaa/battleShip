import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconButton } from '@mui/material'
import { Component, ContextType } from 'react'
import { RoomContext } from '../states/roomProvider'
import Select from './select'

export interface IScreenProps {
    changeScreen: (screen: typeof Screen) => void
    RoomContext: ContextType<typeof RoomContext>
}

abstract class Screen extends Component<IScreenProps> {
    constructor(props: IScreenProps) {
        super(props)
    }
    public BackToLobbyButton = () => (
        <IconButton
            onClick={() => {
                if (!this.props.RoomContext.outRoom) return
                this.props.RoomContext.outRoom()
                this.props.changeScreen(Select)
            }}
            style={{ position: 'absolute', top: 5, left: 5 }}
        >
            <FontAwesomeIcon icon={faArrowCircleLeft} />
        </IconButton>
    )
}

export default Screen
