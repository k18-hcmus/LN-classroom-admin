import axios from 'axios'
import { getLocation } from '../utils/function';

const BASE_URL = `${process.env.REACT_APP_SERVER_URL}/api/`

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

instance.defaults.withCredentials = true

instance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/login" && originalConfig.url !== '/auth/refresh-token' && err.response) {
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    await instance.post("/auth/refresh-token");
                    return instance(originalConfig);
                } catch (_error) {
                    const pathName = getLocation(window.location.href).pathname
                    if (pathName !== '/login' && pathName !== '/register') {
                        window.location.href = '/login'
                    }
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default instance;