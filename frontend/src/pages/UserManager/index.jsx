import { useEffect, useState } from "react";
import { deleteUser, updateUser, getUsers, createUser } from "../../api/user";
import "./styles.css";
import { toast } from "react-toastify";

export default function UserManager() {
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getCarregarPerfis = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Erro ao carregar perfis.");
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!nome || !email) {
      toast("Todos os campos são obrigatórios!");
      return;
    }

    try {
      if (isEditMode) {
        const updatedUser = {
          id,
          name: nome,
          email: email,
          password: password || undefined,
        };
        const response = await updateUser(id, updatedUser);
        if (response.id) {
          toast.success("Usuário atualizado com sucesso!");
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.id === id ? { ...user, name: nome, email: email } : user
            )
          );
        }
      } else {
        const response = await createUser({
          name: nome,
          email: email,
          password,
        });
        if (response) {
          toast.success("Usuário criado com sucesso!");
          setUsers((prevUsers) => [...prevUsers, response]);
          setIsOpen(false);
        }
      }
      setId("");
      setNome("");
      setEmail("");
      setPassword("");
      setIsEditMode(false);
    } catch (error) {
      toast.error(
        isEditMode ? "Erro ao atualizar usuário." : "Erro ao criar usuário."
      );
    }
  };

  const handleEditUser = (user) => {
    setId(user.id);
    setNome(user.name);
    setEmail(user.email);
    setPassword("");
    setIsEditMode(true);
    setIsOpen(true);
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

  const handleChangeSituacao = async (userId) => {
    try {
      const user = users.find((user) => user.id === userId);
      const updatedUser = {
        ...user,
        situacao: user.situacao === "ativo" ? "inativo" : "ativo",
      };
      const response = await updateUser(userId, updatedUser);
      if (response) {
        toast.success("Situação do usuário atualizada com sucesso!");
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId
              ? { ...user, situacao: updatedUser.situacao }
              : user
          )
        );
      }
    } catch (error) {
      toast.error("Erro ao atualizar situação do usuário.");
    }
  };

  useEffect(() => {
    getCarregarPerfis();
  }, []);

  return (
    <div className="admin-page">
      {!isOpen && (
        <button onClick={() => setIsOpen(true)}>Adicionar usuario</button>
      )}
      {isOpen && (
        <div className="form">
          <div className="form-content">
            <h2>{isEditMode ? "Editar Usuário" : "Adicionar Usuário"}</h2>
            <div className="input-group">
              <label>Nome:</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
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
                placeholder={
                  isEditMode ? "Deixe em branco para não alterar" : ""
                }
              />
            </div>
            <button onClick={handleSave}>
              {isEditMode ? "Salvar Alterações" : "Criar Usuário"}
            </button>
            <button
              onClick={() => {
                setIsEditMode(false);
                setId("");
                setNome("");
                setEmail("");
                setPassword("");
                setIsOpen(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <div>
        <h2>Lista de Usuários</h2>
        {loading ? (
          <p>Carregando usuários...</p>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user-card">
              <p>Nome: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Situação: {user.situacao}</p>
              <button onClick={() => handleEditUser(user)}>Editar</button>
              <button onClick={() => handleDeleteUser(user.id)}>Deletar</button>
              <button onClick={() => handleChangeSituacao(user.id)}>
                Alterar Status
              </button>
            </div>
          ))
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}
      </div>
    </div>
  );
}
