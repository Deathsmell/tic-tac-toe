import {random} from './random'

const colors = [
    'primary',
    'secondary',
    'success',
    'danger',
    'warning',
    'info',
    'light',
    'dark',
]

export const randomColor = () => {
    return colors[random(colors.length)]
}

