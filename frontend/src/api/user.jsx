import api from './api'

export const createUser = async (user) => {
    const response = await api.post('api/v1/user', user)
    return response.data
}


export const userInfo = async () => {
    const response = await api.get('api/v1/user/info')
    console.log('retorno da api', response)
    return response.data
}

export const updateUserViewer = async(user) => {
    const response = await api.put(`/api/v1/user/`, user)
    return response.data
}


//adminnnnn
export const updateUser = async(id, user) => {
    const response = await api.put(`/api/v1/user/admin/${id}`, user)
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