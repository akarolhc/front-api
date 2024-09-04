import './styles.css'

export default function Login() {
    return (
        <div className="login">
            <div className="login__container">
                <h1>Login</h1>
                <form className="login__form">
                    <input type="text" placeholder="Username" />
                    <input type="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}

// import React from 'react'

// export default function Login() {
//     return (
//         <div>