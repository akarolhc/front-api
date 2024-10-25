import api from './api'

export const createAdvice = async (advice) => {
    const response = await api.post('api/v1/advice', advice)
    return response.data
}

//adminnnnn
export const updateUser = async(id, user) => {
    const response = await api.put(`/api/v1/user/${id}`, user)
    return response.data
}
export const deleteUser = async(id) => {
    const response = await api.delete(`/api/v1/user/${id}`)
    return response.data
}
export const getUserByIdUser = async(id) => {
    const response = await api.get(`/api/v1/user/${id}`)
    return response.data
}
export const getUsers = async() => {
    const response = await api.get(`/api/v1/user`)
    return response.data
}
export const loginUser = async(email, password) => {
    const response = await api.post(`/api/v1/login`, {email, password})
    return response.data
}