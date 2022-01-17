import BattleShipService from 'games/battleShip/services'
import {
    createContext,
    Dispatch,
    ReactChild,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from 'react'
import { SocketContext } from 'states/context/socket'
import { useAppSelector } from 'states/hooks'
import url from '../api'
import { useCreateAndUpdateRoom } from '../api/useCreateAndUpdateRoom'
import { useListRoom } from '../api/useListRoom'
import { ISensor, ISensorTiles } from '../modals/map'
import { IMessage, IRoom } from '../modals/room'
import { IShip } from '../modals/ship'

export type PlayerRole = 'spectator' | 'player1' | 'player2' | undefined

interface IRoomContextValue {
    roomId: string | undefined
    setRoomId?: Dispatch<SetStateAction<string | undefined>>
    room: IRoom | undefined
    setRoom?: Dispatch<SetStateAction<IRoom | undefined>>
    role: PlayerRole
    setRole?: Dispatch<SetStateAction<PlayerRole>>
    listPlayingRoom: IRoom[]
    setListPlayingRoom?: Dispatch<SetStateAction<IRoom[]>>
    listPrepareRoom: IRoom[]
    setListPrepareRoom?: Dispatch<SetStateAction<IRoom[]>>
    outRoom?: () => void
    attack?: (tile: ISensor) => void
}
const initContextValue = {
    roomId: undefined,
    room: undefined,
    role: undefined,
    listPlayingRoom: [],
    listPrepareRoom: [],
}
export const RoomContext = createContext<IRoomContextValue>(initContextValue)

export const RoomProvider = ({ children }: { children: ReactChild }) => {
    const user = useAppSelector((state) => state.user.current)
    const { socket } = useContext(SocketContext)
    const [roomId, setRoomId] = useState<string>()
    const [room, setRoom] = useState<IRoom>()
    const [listPlayingRoom, setListPlayingRoom] = useState<IRoom[]>([])
    const [listPrepareRoom, setListPrepareRoom] = useState<IRoom[]>([])
    const [role, setRole] = useState<PlayerRole>()

    useCreateAndUpdateRoom(roomId, setRoom, setRoomId)
    useListRoom(setListPlayingRoom, setListPrepareRoom)

    const outRoom = () => {
        if (!user || !room || !socket) return
        if (user._id === room.player1?._id) {
            if (!room.player2 && room.spectators.length === 0)
                socket.emit(`${url}/deleteRoom`, room._id)
            else {
                const userReady = room.userReady.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    userReady,
                }
                socket.emit(`${url}/player1_out`, updateRoom)
            }
        } else if (user._id === room.player2?._id) {
            if (!room.player1 && room.spectators.length === 0)
                socket.emit(`${url}/deleteRoom`, room._id)
            else {
                const userReady = room.userReady.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    userReady,
                }
                socket.emit(`${url}/player2_out`, updateRoom)
            }
        } else {
            if (!room.player1 && !room.player2 && room.spectators.length === 1)
                socket.emit(`${url}/deleteRoom`, room._id)
            else {
                const spectators = room.spectators.filter((u) => u._id !== user._id)
                const updateRoom: Partial<IRoom> = {
                    _id: room._id,
                    spectators,
                }
                socket.emit(`${url}/updateRoom`, updateRoom)
            }
        }
    }

    const attack = (tile: ISensor) => {
        if (!user || !room || !socket) return
        if (!room.player1 || !room.player2) return
        if (user._id !== room.turn) return

        if (tile.type !== 'pure') return

        let arrayName = user.username.split(' ')
        const firstName = arrayName[arrayName.length - 1].slice(0, 10) + ' '
        let message: IMessage = {
            owner: { ...user, username: firstName },
            content: '',
        }
        const considerAttack = (
            shipOrder: 'ships1' | 'ships2',
            sensorOrder: 'sensors1' | 'sensors2',
            playerOrder: 'player1' | 'player2'
        ) => {
            if (!room[playerOrder]) return
            let isHit = false

            for (let ship of room[shipOrder]) {
                for (let body of ship.body) {
                    if (body.x === tile.x && body.y === tile.y) {
                        isHit = true
                        let foundShip: IShip
                        const newShips: IShip[] = room[shipOrder].map((s) =>
                            s.body === ship.body
                                ? (() => {
                                      foundShip = {
                                          ...s,
                                          body: s.body.map((b) =>
                                              b.x === tile.x && b.y === tile.y
                                                  ? { ...b, type: 'hit' }
                                                  : b
                                          ),
                                      }
                                      return foundShip
                                  })()
                                : s
                        )
                        const newSensors: ISensorTiles = room[sensorOrder].map((sensor) =>
                            sensor.x === tile.x && sensor.y === tile.y
                                ? { ...tile, type: 'hit' }
                                : sensor
                        )

                        if (
                            BattleShipService.isDestroyFullShip(
                                newShips.find((s) => s === foundShip) as IShip
                            )
                        )
                            message.content = 'was completely sunk ' + ship.name
                        else message.content = 'hit'

                        if (BattleShipService.isEndGame(newShips))
                            message.content = 'is winner'

                        socket.emit(`${url}/updateRoom`, {
                            _id: room._id,
                            [sensorOrder]: newSensors,
                            [shipOrder]: newShips,
                            turn: room[playerOrder]?._id,
                            message,
                        })
                        break
                    }
                }
            }
            if (!isHit) {
                message.content = 'missed, no ship was shot'
                const newSensors = room[sensorOrder].map((sensor) =>
                    sensor.x === tile.x && sensor.y === tile.y
                        ? { ...tile, type: 'miss' }
                        : sensor
                )
                socket.emit(`${url}/updateRoom`, {
                    _id: room._id,
                    [sensorOrder]: newSensors,
                    turn: room[playerOrder]?._id,
                    message,
                })
            }
        }

        if (user._id === room.player1._id) considerAttack('ships2', 'sensors2', 'player2')
        else if (user._id === room.player2._id)
            considerAttack('ships1', 'sensors1', 'player1')
    }

    useEffect(() => {
        if (!room) return
        setRoomId(room._id)
    }, [room?._id])

    useEffect(() => {
        if (!socket || !user) return

        socket.emit(`${url}/getListRoom`, user._id)
    }, [])

    return (
        <RoomContext.Provider
            value={{
                roomId,
                setRoomId,
                room,
                setRoom,
                role,
                setRole,
                listPlayingRoom,
                listPrepareRoom,
                setListPlayingRoom,
                setListPrepareRoom,
                outRoom,
                attack,
            }}
        >
            {children}
        </RoomContext.Provider>
    )
}
