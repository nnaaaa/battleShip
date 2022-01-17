import { Box } from '@mui/material'
import Constants from 'games/battleShip/services/constants'
import { DragEvent } from 'react'

interface IDroppableTile {
    x: number
    y: number
    onDrop: () => void
}

function DroppableTile({ x, y, onDrop }: IDroppableTile) {
    const dragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
    }

    return (
        <div
            key={`droppableTile ${y}${x}`}
            style={{
                width: Constants.boardSize,
                height: Constants.boardSize,
                position: 'absolute',
                left: x * Constants.boardSize,
                top: y * Constants.boardSize,
                backgroundColor: 'transparent',
                borderBottom: '1px solid white',
                borderRight: '1px solid white',
            }}
            onDragOver={dragOver}
            onDrop={onDrop}
        />
    )
}

export default DroppableTile
