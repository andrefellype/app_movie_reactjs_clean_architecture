/* eslint-disable react/function-component-definition */
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
    '@global': {
        '*': { boxSizing: 'border-box', margin: 0, padding: 0 },
        html: {
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
            height: '100%', width: '100%'
        },
        body: { backgroundColor: '#e2e9f0', height: '100%', width: '100%' },
        a: { textDecoration: 'none' },
        '#root': { height: '100%', width: '100%' }
    }
})

const GlobalStyles = () => {
    useStyles()
    return null
}

export default GlobalStyles