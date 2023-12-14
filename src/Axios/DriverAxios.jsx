import axios from "axios"
import { Store } from "../Redex/Store"

const ENV = import.meta.env

// Create instance
const driverInstance = axios.create({
    baseURL:ENV.VITE_DRIVER_API,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Request interceptor
driverInstance.interceptors.request.use(
    config => {
        const driverState = Store.getState().driver;
        config.headers['authorization'] = `Bearer ${driverState.token}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default driverInstance
