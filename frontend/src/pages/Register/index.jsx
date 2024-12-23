import { useState } from 'react';
import './styles.css';
import {toast} from 'react-toastify'
import { createUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      const responseApi = await createUser({name, email, password})
      console.log(responseApi)
      if(responseApi.id){
        navigate('/login')
      } else {
        console.log(responseApi)
      }
    } catch (error) {
      console.log(error)
      if (error.status === 403) {
        return toast("Sem permissão.");
      }
      if (error.status === 401 || error.status === 404) {
        return toast('Email ou senha inválido, tente novamente!');
      }
      toast('Erro inesperado, tente novamente mais tarde!');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Registro</h2>
        <div className="input-group">
          <label>Nome:</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>
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
        <button type="submit" className="register-button">Registrar</button>
        <button onClick={() => navigate('/login')} style={{width:'100%'}}>Voltar</button>
      </form>
    </div>
  );
}

export default Register;