import { Box } from '@mui/material'
import { IShipDirection } from 'games/battleShip/modals/ship'
import { Dispatch, SetStateAction, useState } from 'react'
import Select from 'react-select'
import className from '../prepareStyle.module.css'

export interface ISelectDirection {
    value: IShipDirection
    label: string
}
export const useInitDirection = () =>
    useState<ISelectDirection>({
        value: 'top',
        label: 'top',
    })

export const options: ISelectDirection[] = [
    { value: 'top', label: 'top' },
    { value: 'left', label: 'left' },
    { value: 'bottom', label: 'bot' },
    { value: 'right', label: 'right' },
]

interface ISelectDirectionProps {
    direction: ISelectDirection
    setDirection: Dispatch<SetStateAction<ISelectDirection>>
}

const SelectDirection = (props: ISelectDirectionProps) => {
    return (
        <Box>
            <p className={className.title}>Direction</p>
            <Select
                value={props.direction}
                options={options}
                onChange={(nValue) => props.setDirection(nValue as ISelectDirection)}
            />
        </Box>
    )
}

export default SelectDirection
