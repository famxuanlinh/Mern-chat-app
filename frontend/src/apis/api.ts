import axios from "axios";
import env from '@constants/env'

const getToken = (): string | undefined => {
    const userRaw = window.localStorage.getItem('userInfo');
    if(!userRaw) return undefined
    const user = JSON.parse(userRaw)
    return user?.token || undefined
}

console.log( env.API_BASE_URL)
const api = axios.create({
    baseURL: env.API_BASE_URL,
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        "Content-Type": "application/json",
        'Authorization': getToken() ? 'Bearer ' + getToken() : undefined
    }
  });

 export default api; 