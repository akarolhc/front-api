import { useEffect, useState } from "react";
import {
  findAllAdvices,
  deleteAdvice,
  updateAdvice,
  createAdvice,
  alimentarConselhos,
} from "../../api/advice";
import { toast } from "react-toastify";
import "./styles.css";
import { translateText } from "../../api/translate";

export default function AdviceManager() {
  const [id, setId] = useState("");
  const [advice, setAdvice] = useState("");
  const [advices, setAdvices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getAdvices = async () => {
    try {
      const response = await findAllAdvices();

      setAdvices(response);
      setLoading(false);
    } catch (error) {
      console.log("Erro ao buscar conselhos:", error);
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!advice) {
      toast("O campo é obrigatório!");
      return;
    }

    try {
      if (isEditMode) {
        const updatedAdvice = { id, advice };
        const response = await updateAdvice(id, updatedAdvice);
        if (response) {
          toast.success("Conselho atualizado com sucesso!");
          setAdvices((prevAdvices) =>
            prevAdvices.map((item) =>
              item.id === id ? { ...item, advice } : item
            )
          );
        }
      } else {
        const response = await createAdvice(advice);
        if (response) {
          toast.success("Conselho criado com sucesso!");
          setAdvices((prevAdvices) => [...prevAdvices, response]);
          setIsOpen(false);
        }
      }
      setId("");
      setAdvice("");
      setIsEditMode(false);
    } catch (error) {
      toast.error(
        isEditMode ? "Erro ao atualizar conselho." : "Erro ao criar conselho."
      );
    }
  };

  const handleEditAdvice = (advice) => {
    setId(advice.id);
    setAdvice(advice.advice);
    setIsEditMode(true);
    setIsOpen(true);
  };

  const handleDeleteAdvice = async (adviceId) => {
    if (window.confirm("Tem certeza que deseja deletar este conselho?")) {
      try {
        await deleteAdvice(adviceId);
        toast.success("Conselho deletado com sucesso!");
        setAdvices((prevAdvices) =>
          prevAdvices.filter((item) => item.id !== adviceId)
        );
      } catch {
        toast.error("Erro ao deletar conselho.");
      }
    }
  };

  const handleAlimentarConselhos = async () => {
    try {
      const response = await alimentarConselhos();
      if (response) {
        toast.success("Conselhos alimentados com sucesso!");
        getAdvices();
      }
    } catch {
      toast.error("Erro ao alimentar conselhos.");
    }
  };

  useEffect(() => {
    getAdvices();
  }, []);

  return (
    <div className="admin-page">
      {!isOpen && (
        <div className="top-buttons">
          <button onClick={handleAlimentarConselhos}>
            Alimentar conselhos
          </button>
          <button onClick={() => setIsOpen(true)}>Adicionar conselho</button>
        </div>
      )}
      {isOpen && (
        <div className="form">
          <div className="form-content">
            <h2>{isEditMode ? "Editar Conselho" : "Adicionar Conselho"}</h2>
            <div className="input-group">
              <input
                type="text"
                value={advice}
                onChange={(e) => setAdvice(e.target.value)}
              />
            </div>
            <button onClick={handleSave}>
              {isEditMode ? "Salvar Alterações" : "Criar Conselho"}
            </button>
            <button
              onClick={() => {
                setIsEditMode(false);
                setId("");
                setAdvice("");
                setIsOpen(false);
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      <div>
        <h2>Lista de Conselhos</h2>
        {loading ? (
          <p>Carregando conselhos...</p>
        ) : advices ? (
          advices.map((item) => (
            <div key={item.id} className="advice-card">
              <p>{item.advice}</p>
              <div className="advice-buttons">
                <button onClick={() => handleEditAdvice(item)}>Editar</button>
                <button onClick={() => handleDeleteAdvice(item.id)}>
                  Deletar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum conselho encontrado.</p>
        )}
      </div>
    </div>
  );
}
