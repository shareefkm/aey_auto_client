import axios from "axios"
import { Store } from "../Redex/Store"

const ENV = import.meta.env

// Create instance
const userInstance = axios.create({
    baseURL:ENV.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
userInstance.interceptors.request.use(
    config => {
        const userState = Store.getState().user;
        config.headers['authorization'] = `Bearer ${userState.token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default userInstance
