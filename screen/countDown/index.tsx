import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Screen from '..'
import Playing from '../playing'
import className from './countDown.module.css'
import Loading from 'games/battleShip/components/loading'

class CountDown extends Screen {
    render() {
        return <CountDownFunc state={this} />
    }
}

export default CountDown

const CountDownFunc = ({ state }: { state: Screen }) => {
    const [count, setCount] = useState(3)
    useEffect(() => {
        const timeoutRef = setInterval(() => {
            setCount((pre) => {
                if (pre <= -2) {
                    clearInterval(timeoutRef)
                    setTimeout(() => {
                        state.props.changeScreen(Playing)
                    }, 100)
                    return -1
                } else return pre - 1
            })
        }, 1000)

        return () => {
            clearInterval(timeoutRef)
        }
    }, [])

    // return (
    //     <Box
    //         width="100%"
    //         height="100%"
    //         display="flex"
    //         justifyContent="center"
    //         alignItems="center"
    //     >
    //         <p className={className.text}>{count < 0 ? 'Start' : count}</p>
    //     </Box>
    // )
    return <Loading />
}
