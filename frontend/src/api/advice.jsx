import api from './api'

export const createAdvice = async (advice) => {
    const response = await api.post('api/v1/advice', advice)
    return response.data
}

export const getAdvices = async () => {
    const response = await api.get('api/v1/advice')
    return response.data
}

export const getAdviceById = async (id) => {
    const response = await api.get(`api/v1/advice/${id}`)
    return response.data
}

export const updateAdvice = async (id, advice) => {
    const response = await api.put(`api/v1/advice/${id}`, advice)
    return response.data
}

export const deleteAdvice = async (id) => {
    const response = await api.delete(`api/v1/advice/${id}`)
    return response.data
}