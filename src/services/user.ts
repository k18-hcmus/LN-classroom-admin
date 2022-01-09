import { USER_ROLE } from '../shared/constant'
import api from './api'

const BASE_URL = 'users/'
export interface UpdateProfileParams {
    firstName: string,
    lastName: string,
    studentId: string
}

export const updateProfile = (payload: UpdateProfileParams) => {
    return api.patch(BASE_URL, payload)
}

export const changePassword = (payload: { oldPassword: string, newPassword: string }) => {
    return api.post(BASE_URL + "change-password", payload)
}

export const getUserDataById = (id: string) => {
    return api.get(BASE_URL + `${id}`)
}

export const getUserDataByStudentId = (studentId: string) => {
    return api.get(BASE_URL + `students/${studentId}`)
}

export const getAllAdmin = () => api.get(`${BASE_URL}?role=${USER_ROLE.ADMIN}`);
export const getAllMember = () => api.get(`${BASE_URL}?role=${USER_ROLE.MEMBER}`);
