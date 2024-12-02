import { useState, useEffect } from "react";
import { userInfo, updateUserViewer } from "../../api/user";
import "./styles.css";
import { toast } from "react-toastify";

export default function User() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUser = async () => {
    try {
      const response = await userInfo();
      setId(response.id);
      setName(response.name);
      setEmail(response.email);
    } catch (error) {
      toast.error("Erro ao carregar usuário.");
    }
  };

  const handleSave = async () => {
    if (!name || !email) {
      toast("Todos os campos são obrigatórios!");
      return;
    }

    try {
      const updatedUser = {
        id,
        name,
        email,
        password,
      };
      const response = await updateUserViewer(updatedUser);
      if (response) {
        toast.success("Usuário atualizado com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao atualizar usuário.");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="user-page">
      <h2>Editar Perfil</h2>
      <div className="input-group">
        <label>name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
      <div className="input-group">
        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Deixe em branco para não alterar"
        />
      </div>
      <button onClick={handleSave}>Salvar</button>
    </div>
  );
}
