import { Box } from '@mui/material'
import { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Screen, { IScreenProps } from '..'
import CreateRoom from './createRoom'
import JoinPlaying from './joinPlaying'
import JoinWatching from './joinWatching'
import TabBar from './tabBar'

const SelectFunc = ({ state }: { state: Select }) => {
    const [index, setIndex] = useState(0)

    return (
        <>
            <TabBar setIndex={setIndex} />

            <SwipeableViews
                axis={'x'}
                index={index}
                onChangeIndex={(index: number) => setIndex(index)}
            >
                <CreateRoom changeScreen={state.props.changeScreen} />
                <JoinPlaying changeScreen={state.props.changeScreen} />
                <JoinWatching changeScreen={state.props.changeScreen} />
            </SwipeableViews>
        </>
    )
}

class Select extends Screen {
    constructor(props: IScreenProps) {
        super(props)
    }

    render() {
        return <SelectFunc state={this} />
    }
}

export default Select
