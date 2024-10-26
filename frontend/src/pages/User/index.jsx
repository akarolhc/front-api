import React, { useState } from 'react';
import './styles.css';

export default function User() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdate = () => {
    // lógica para atualizar o usuário
    console.log('Usuário atualizado');
  };

  const handleDelete = () => {
    // lógica para deletar o usuário
    console.log('Usuário deletado');
  };

  return (
    <div className="user-page">
      <div className="user-container">
        <h2>Gerenciar Usuário</h2>
        <div className="input-group">
          <label>Nome de Usuário:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <button className="update-button" onClick={handleUpdate}>Atualizar</button>
        <button className="delete-button" onClick={handleDelete}>Deletar Conta</button>
      </div>
    </div>
  );
}
