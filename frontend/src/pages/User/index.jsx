import { useContext, useEffect, useState } from "react";
import {
  deleteUser,
  updateUser,
  updateUserViewer,
  userInfo,
  getUsers,
} from "../../api/user";
import "./styles.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/Context";
import { findById } from "../../api/advice";

export default function User() {
  const navigate = useNavigate();

  const { logout, role } = useContext(AuthContext);

  const [id, setId] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updNome, setUpdNome] = useState("");
  const [updEmail, setUpdEmail] = useState("");
  const [updPassword, setUpdPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newNome, setNewNome] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");


  async function carregarPerfil() {
    try {
      const response = await userInfo();

      if (response.id) {
        setId(response.id);
        setUsername(response.name);
        setEmail(response.email);
      }
    } catch {
      toast.error("Erro ao carregar o perfil.");
    }
  }

  const handleSaveUpdate = async () => {
    try {
      const response = await updateUserViewer({
        name: updNome,
        email: updEmail,
        password: updPassword,
      });
      if (response.id) {
        setUsername(updNome);
        setEmail(updEmail);
        setPassword(updPassword);
        setIsUpdate(false);
        toast.success("Perfil atualizado!");
      }
    } catch {
      toast.error("Erro ao salvar atualização.");
    }
  };

  const handleClickDelete = async () => {
    const response = prompt("Para confirmar a exclusão, digite seu email:");
    if (response === email) {
      try {
        await deleteUser(id);
        logout();
        navigate("/login");
      } catch {
        toast.error("Erro ao excluir usuário.");
      }
    } else {
      toast.error("Email incorreto, processo cancelado!");
    }
  };

  const getCarregarPerfis = async () => {
    try {
      const response = await getUsers();

      console.log(response);

      setUsers(response.data);
      return setLoading(false);
    } catch (error) {
      toast.error("Erro ao carregar perfis.");
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!newNome || !newEmail || !newPassword) {
      toast.error("Todos os campos são obrigatórios!");
      return;
    }
  
    try {
      const response = await createUser({
        name: newNome,
        email: newEmail,
        password: newPassword,
      });
  
      if (response) {
        toast.success("Usuário criado com sucesso!");
        setUsers((prevUsers) => [...prevUsers, response]); // Adiciona o novo usuário à lista existente
        setNewNome("");
        setNewEmail("");
        setNewPassword("");
      }
    } catch (error) {
      toast.error("Erro ao criar usuário.");
    }
  };
  
  const handleEditUser = (user) => {
    setId(user.id); // Define o ID do usuário que será editado
    setUpdNome(user.name); // Preenche o nome atual do usuário
    setUpdEmail(user.email); // Preenche o email atual do usuário
    setUpdPassword(""); // Limpa o campo de senha para evitar exibição de senha
    setIsUpdate(true); // Ativa o modo de edição
  };

  const handleSaveEdit = async () => {
    try {
      const updatedUser = {
        id,
        name: updNome,
        email: updEmail,
        password: updPassword || undefined, // Senha opcional
      };
  
      // Chama a API para atualizar o usuário
      const response = await updateUser(id, updatedUser);
      if (response.id) {
        toast.success("Usuário atualizado com sucesso!");
  
        // Atualiza a lista de usuários no frontend
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === id ? { ...user, name: updNome, email: updEmail } : user
          )
        );
  
        // Reseta os estados
        setId("");
        setUpdNome("");
        setUpdEmail("");
        setUpdPassword("");
        setIsUpdate(false);
      }
    } catch (error) {
      toast.error("Erro ao atualizar o usuário.");
      console.error(error);
    }
  };
  
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Tem certeza que deseja deletar este usuário?")) {
      try {
        await deleteUser(userId);
        toast.success("Usuário deletado com sucesso!");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch {
        toast.error("Erro ao deletar usuário.");
      }
    }
  };

  const handleViewUser = (user) => {
    alert(
      `Detalhes do Usuário:\n\nNome: ${user.name}\nEmail: ${user.email}\nRole: ${user.role}`
    );
  };

  useEffect(() => {
    if (role === "admin") {
      getCarregarPerfis();
    } else {
      carregarPerfil();
    }
  }, []);

  useEffect(() => {
    console.log("Usuários atualizados:", users);
  }, [users]);

  return (
    <div className="user-page">
      {role === "admin" ? (
        loading ? (
          <p>Carregando usuários...</p>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user.id}>
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <button onClick={() => handleEditUser(user)}>Editar</button>
              {isUpdate && user.id === id && (
                <div className="edit-form">
                  <h3>Editar Usuário</h3>
                  <div className="input-group">
                    <label>Nome:</label>
                    <input
                      type="text"
                      value={updNome}
                      onChange={(e) => setUpdNome(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      value={updEmail}
                      onChange={(e) => setUpdEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Senha (opcional):</label>
                    <input
                      type="password"
                      value={updPassword}
                      onChange={(e) => setUpdPassword(e.target.value)}
                    />
                  </div>
                  <button onClick={handleSaveEdit}>Salvar Alterações</button>
                  <button onClick={() => setIsUpdate(false)}>Cancelar</button>
                </div>
              )}
              <button onClick={() => handleDeleteUser(user.id)}>Deletar</button>
              <button onClick={() => handleViewUser(user)}>Visualizar</button>
            </div>
          ))
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )
      ) : (
        <div className="user-container">
          <h2>Gerenciar Usuário</h2>
          <div className="input-group">
            <label>
              Nome de Usuário:{" "}
              {!isUpdate ? (
                username
              ) : (
                <input
                  type="text"
                  id="nome"
                  value={updNome}
                  onChange={(e) => setUpdNome(e.target.value)}
                />
              )}{" "}
            </label>
            <input
              type="text"
              value={updNome}
              onChange={(e) => setUpdNome(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>
              Email:
              {!isUpdate ? (
                email
              ) : (
                <input
                  type="email"
                  id="email"
                  value={updEmail}
                  onChange={(e) => setUpdEmail(e.target.value)}
                />
              )}
            </label>
            <input
              type="email"
              value={updEmail}
              onChange={(e) => setUpdEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>
              Senha:
              {!isUpdate ? (
                password
              ) : (
                <input
                  type="password"
                  id="password"
                  value={updPassword}
                  onChange={(e) => setUpdPassword(e.target.value)}
                />
              )}
            </label>
            <input
              type="password"
              value={updPassword}
              onChange={(e) => setUpdPassword(e.target.value)}
            />
          </div>
          <button className="update-button" onClick={handleSaveUpdate}>
            Atualizar
          </button>
          <button className="delete-button" onClick={handleClickDelete}>
            Deletar Conta
          </button>
        </div>
      )}
    </div>
  );
}
