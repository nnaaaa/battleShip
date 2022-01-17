import { Box } from '@mui/material'
import useDraggable from 'games/battleShip/components/map/draggableAtlas/useDraggable'
import { IShip, IShipDirection } from 'games/battleShip/modals/ship'
import Constants from 'games/battleShip/services/constants'
import ShipFactory from 'games/battleShip/services/shipFactories/shipFactory'
import { Component, Dispatch, SetStateAction } from 'react'

interface IShipProps {
    representShip: IShip
    dragTool: ReturnType<typeof useDraggable>
    setShips: Dispatch<SetStateAction<IShip[]>>
    ShipFactory: ShipFactory
}

interface IShipStates {}

class DraggableShip extends Component<IShipProps, IShipStates> {
    constructor(props: IShipProps) {
        super(props)
        this.state = {}
    }
    rotate = (direction: IShipDirection) => {
        switch (direction) {
            case 'top':
                return 'rotate(0)'
            case 'left':
                return 'rotate(-90deg)'
            case 'bottom':
                return 'rotate(180deg)'
            case 'right':
                return 'rotate(90deg)'
            default:
                return ''
        }
    }
    render() {
        const { representShip, dragTool, ShipFactory, setShips } = this.props
        const { size } = this.props.representShip
        const { height, width } = size
        const verticalSize = height < width ? { width: height, height: width } : size

        return (
            <Box
                position="absolute"
                // className={hovered ? style.hovered : style.unhover}
                zIndex={19998}
                width={representShip.size.width * Constants.boardSize}
                height={representShip.size.height * Constants.boardSize}
                top="50%"
                left="50%"
                sx={{ transform: 'translate(-50%,-50%)', cursor: 'grab' }}
                draggable
                // onMouseOver={
                //     drag === 'false'
                //         ? () => {
                //               if (hoverRef.current) clearTimeout(hoverRef.current)
                //               setHovered(true)
                //           }
                //         : () => {}
                // }
                // onMouseOut={
                //     drag === 'false'
                //         ? () => {
                //               hoverRef.current = setTimeout(() => {
                //                   setHovered(false)
                //               }, 50)
                //           }
                //         : () => {}
                // }
            >
                {representShip.body.map((b, idx) => (
                    <Box
                        key={'dragShip' + b.x + b.y}
                        width={Constants.boardSize}
                        height={Constants.boardSize}
                        position="absolute"
                        zIndex={20000}
                        left={(b.x - representShip.body[0].x) * Constants.boardSize}
                        top={(b.y - representShip.body[0].y) * Constants.boardSize}
                        bgcolor="transparent"
                        onDoubleClick={() => {
                            ShipFactory.createShipByRand(representShip.name)
                            setShips(ShipFactory.getShips())
                        }}
                        onMouseDown={() => {
                            dragTool.setPickedBodyOrder(idx)
                            dragTool.setPickedShip(representShip)
                        }}
                    />
                ))}
                <div
                    style={{
                        position: 'absolute',
                        zIndex: 19999,
                        width: verticalSize.width * Constants.boardSize,
                        height: verticalSize.height * Constants.boardSize,
                        top: '50%',
                        left: '50%',
                        background: `url(${Constants.getShipImage(
                            representShip.name
                        )}) center center / 
                    ${verticalSize.width * Constants.boardSize}px 
                    ${verticalSize.height * Constants.boardSize}px no-repeat`,
                        transform:
                            'translate(-50%,-50%) scale(0.9) ' +
                            this.rotate(representShip.direction),
                        imageRendering: 'pixelated',
                    }}
                />
                {/* {drag === 'false' && hovered && (
                    <FontAwesomeIcon
                        icon={faTimesCircle}
                        className={style.remove}
                        key={'hover-remove' + ship.image}
                        onClick={onRemove ? onRemove : () => {}}
                    />
                )} */}
            </Box>
        )
    }
}

export default DraggableShip
