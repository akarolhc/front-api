import { useEffect, useState } from "react";
import "./styles.css";
import {
  createAdvice,
  findOne,
  deleteAdvice, // Função para deletar permanentemente
  createUserAdvice,
  userAdvices,
  updateAdvice,
  findAllAdvices,
} from "../../api/advice";
import { translateText } from "../../api/translate";

export default function Api() {
  const [advice, setAdvice] = useState(null); // Armazena o conselho atual
  const [advices, setAdvices] = useState([]); // Lista de conselhos favoritos
  const [updateAdviceValue, setUpdateAdviceValue] = useState(null); // Armazena o conselho em edição

  // Função para traduzir um conselho
  const traduzirConselho = async (text) => {
    try {
      const translation = await translateText(text, "pt");
      return translation.responseData.translatedText;
    } catch (e) {
      console.log("Erro ao traduzir o conselho", e);
      return text;
    }
  };

  // Adiciona um conselho aos favoritos
  const handleLikeButtonClick = async () => {
    if (advice) {
      try {
        const response = await createAdvice({
          advice: advice.translatedAdvice,
        });

        if (response.status === 201 && response.data) {
          const responseUserAdvice = await createUserAdvice(response.data);

          if (responseUserAdvice.status === 201) {
            getFavorites();
          }
        }
      } catch (e) {
        console.log("Erro ao adicionar o conselho aos favoritos", e);
      }
    }
  };

  // Busca todos os conselhos do banco
  const getFavorites = async () => {
    try {
      const response = await findAllAdvices();

      if (response) {
        const favoriteList = response.map((item) => ({
          id: item.id,
          advice: item.advice,
        }));

        setAdvices(favoriteList);
        console.log("Conselhos carregados:", favoriteList);
      } else {
        console.log("Nenhum conselho encontrado.");
      }
    } catch (e) {
      console.log("Erro ao buscar conselhos", e);
    }
  };

  // Apaga um conselho do banco de dados
  const handleDeleteAdvice = async (id) => {
    try {
      console.log("Apagando conselho com ID:", id);
      await deleteAdvice(id); // Faz a requisição DELETE para o banco de dados
      getFavorites(); // Atualiza a lista após excluir
    } catch (e) {
      console.log("Erro ao apagar conselho", e);
    }
  };

  // Atualiza um conselho
  const handleUpdateAdvice = async () => {
    try {
      if (!updateAdviceValue) {
        console.error("Nenhum conselho em edição.");
        return;
      }

      await updateAdvice(updateAdviceValue.id, {
        advice: updateAdviceValue.advice,
      });

      setUpdateAdviceValue(null); // Sai do modo de edição
      getFavorites(); // Atualiza a lista
    } catch (e) {
      console.log("Erro ao atualizar conselho", e);
    }
  };

  // Carrega os conselhos ao inicializar o componente
  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="api-container">
      <h1>Conselho para você:</h1>

      {advice ? (
        <div key={advice.id}>
          <h2>{advice.translatedAdvice}</h2>
        </div>
      ) : (
        <p>Carregando conselho...</p>
      )}

      <div className="button-container">
        <input
          type="button"
          onClick={handleLikeButtonClick}
          value="Curtir Conselho"
          className="new-advice-button"
        />
      </div>

      {advices.length > 0 && (
        <div className="favorites-container">
          <h3>Conselhos no Banco de Dados:</h3>
          <ul>
            {advices.map((fav) => (
              <li key={fav.id}>
                {updateAdviceValue && updateAdviceValue.id === fav.id ? (
                  <div>
                    <input
                      type="text"
                      value={updateAdviceValue.advice}
                      onChange={(e) =>
                        setUpdateAdviceValue({
                          ...updateAdviceValue,
                          advice: e.target.value,
                        })
                      }
                    />
                    <button onClick={handleUpdateAdvice}>Salvar</button>
                    <button onClick={() => setUpdateAdviceValue(null)}>
                      Cancelar
                    </button>
                  </div>
                ) : (
                  <>
                    {fav.advice}
                    <button onClick={() => setUpdateAdviceValue(fav)}>
                      Alterar Conselho
                    </button>
                    <button onClick={() => handleDeleteAdvice(fav.id)}>
                      Apagar Conselho
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
