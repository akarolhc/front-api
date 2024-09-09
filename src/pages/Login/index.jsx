// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importando o hook de navegação
import './styles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook para redirecionar

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Redireciona para a página Home após o formulário ser submetido
    navigate('/');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <div className="input-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="input-group">
          <label>Senha:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="login-button">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
