import { USER_ROLE } from '../shared/constant'
import { User } from '../slices/user-slice'
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

export const banUserById = (id: string) => {
    return api.post(BASE_URL + `${id}/ban`)
}

export const mapStudentId = (id: string, studentId: string) => {
    return api.post(BASE_URL + `${id}/map-student-id`, { studentId })
}

export const getUserDataByStudentId = (studentId: string) => {
    return api.get(BASE_URL + `students/${studentId}`)
}
export const createAdminUser = (user: User) => {
    return api.post(`${BASE_URL}create-admin`, user)
}
export const getAllAdmin = () => api.get(`${BASE_URL}?role=${USER_ROLE.ADMIN}`);
export const getAllMember = () => api.get(`${BASE_URL}?role=${USER_ROLE.MEMBER}`);
