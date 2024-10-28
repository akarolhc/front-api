import { useContext, useEffect, useState } from 'react';
import { deleteUser, updateUser, userInfo } from '../../api/user'
import './styles.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/Context';

export default function User() {

  const navigate = useNavigate();
  
  const { logout } = useContext(AuthContext);

  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [isUpdate, setIsUpdate] = useState(false);
  const [updNome, setUpdNome] = useState('');
  const [updEmail, setUpdEmail] = useState('');

  async function carregarPerfil() {
    try {
      const response = await userInfo();
      console.log(response);
      if (response.id) {
        setId(response.id);
        setUsername(response.name);
        setEmail(response.email);
      }
    } catch {
      toast.error('Erro ao carregar o perfil.');
    }    
  }

  const handleSaveUpdate = async () => {
    try {
      const response = await updateUser(id, { name: updNome, email: updEmail });
      if (response.id) {
        setUsername(updNome);
        setEmail(updEmail);
        setIsUpdate(false);
        toast.success('Perfil atualizado!');
      }    
    } catch {
      toast.error('Erro ao salvar atualização.');
    }
  };

  const handleClickUpdate = () => {
    setIsUpdate(true);
    setUpdNome(username);
    setUpdEmail(email);
  };

  const handleClickDelete = async () => {
    const response = prompt('Para confirmar a exclusão, digite seu email:');
    if (response === email) {
      try {
        await deleteUser(id);
        logout();
        navigate('/login');
      } catch {
        toast.error('Erro ao excluir usuário.');
      }
    } else {
      toast.error('Email incorreto, processo cancelado!');
    }
  };

  useEffect(() => {
    carregarPerfil();
  }, []);

  return (
    <div className="user-page">
      <div className="user-container">
        <h2>Gerenciar Usuário</h2>
        <div className="input-group">
          <label>Nome de Usuário: {!isUpdate ? username: <input type='text' id="nome" value={updNome} onChange={(e) => setUpdNome(e.target.value)}/>} </label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>Email:{!isUpdate ? email : <input type='email' id="email" value={updEmail} onChange={(e) => setUpdEmail(e.target.value)}/>}</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
      <button className="update-button" onClick={handleClickUpdate}>Atualizar</button>
        <button className="delete-button" onClick={handleClickDelete}>Deletar Conta</button>
      </div>
    </div>
  );
}