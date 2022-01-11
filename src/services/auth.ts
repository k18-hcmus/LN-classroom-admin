import { User } from '../slices/user-slice'
import api from './api'

const BASE_URL = 'auth/'

export const loginUser = (payload: { username: string, password: string, rememberMe?: string }) => {
    return api.post(BASE_URL + "login", { ...payload, isAdmin: true })
}

export const loginUserWithGoogle = (googleData: any) => {
    return api.post(BASE_URL + "google", {
        token: googleData.tokenId
    })
}

export const checkAuthentication = () => {
    return api.get(BASE_URL)
}

export const registerUser = (user: User) => {
    return api.post(BASE_URL + "register", user)
}

export const logout = () => {
    return api.post(BASE_URL + "logout")
}
