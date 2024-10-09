import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './styles.css';
import { loginUser } from '../../api/user';
import { AuthContext } from '../../auth/Context';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {login} = useContext(AuthContext)

  const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await loginUser(email, password)
      if (response.token){
        login(response.token)
        navigate('/');
      }
    } catch(erro) {
      console.log(erro)
      return alert(erro.response.data.error)
    }
  };

  return (
    <div className="login-container">
      <form className="login-form">
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
        <button type="submit" className="login-button" onClick={handleLogin}>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
