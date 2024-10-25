import { useEffect, useState } from 'react'
import { createContext } from "react"
import { jwtDecode } from "jwt-decode"

const isValidToken = (token) => {
    try{
        const decode = jwtDecode(token)
        const currentTime = Date.now() / 1000
        return decode.exp > currentTime
    }catch(error){
        return false
    }
}
const getRole =  (token) => {
    try{
        const decode = jwtDecode(token)
        console.log('jwtDecode', decode)
        return decode.permissao
    }catch(error){
        return false
    }
}

const getId = (token) => {
    try{
        const decode = jwtDecode(token)
        return decode.id
    } catch(error){
        return false
    }
}

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(null)
    const [role, setRole] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = (newToken) => {
        setToken(newToken)
        setRole(getRole(newToken)) // função pra pegar a role do token
        setUserId(getId(newToken))
        localStorage.setItem('token', newToken)
    }

    const logout = () => {
        setToken(null)
        setRole(null) // função pra pegar a role do token
        setUserId(null)
        localStorage.removeItem('token')
    }

    useEffect(() => {
        const storage = localStorage.getItem('token')
        if (storage && isValidToken(storage)) {
            setToken(storage)
            setRole(getRole(storage))
            setUserId(getId(storage))
        }
    }, [])

    return (
      <AuthContext.Provider value={{ token, role, login, logout, userId }}>
        { children }
      </AuthContext.Provider>
    )
}