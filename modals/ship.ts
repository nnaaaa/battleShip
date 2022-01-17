export type ListShipName =
    | 'Lightnight'
    | 'Cruiser'
    | 'Rescue'
    | 'Submarine'
    | 'Destroyer'
    | 'Carrier'
    | 'Patrol'
export type IShipDirection = 'left' | 'right' | 'top' | 'bottom'

export interface IBody {
    x: number
    y: number
    type: 'pure' | 'hit'
}
export interface IShipSize {
    width: number
    height: number
}
export interface IShipCategories {
    name: ListShipName
    size: IShipSize
}

export interface IShip extends IShipCategories {
    body: IBody[]
    direction: IShipDirection
}

export interface IShipCategoryManager {
    name: ListShipName
    current: number
    limit: number
}
