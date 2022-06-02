import axios from 'axios'
import { SYSTEM_URL } from './consts'

const api = axios.create({
    baseURL: SYSTEM_URL,
    headers: {
        'Accept': 'application/json',
        'x-access-token': ""
    }
})

export default api