import { useEffect, useState } from "react";
import "./styles.css";
import {
  createAdvice,
  findOne,
  deleteUserAdvice,
  createUserAdvice,
  userAdvices
} from "../../api/advice";
import { translateText } from "../../api/translate";
import { useNavigate } from "react-router-dom";

export default function Api() {
  const [advice, setAdvice] = useState(null);
  const [advices, setAdvices] = useState([]);
  const navigate = useNavigate();

  const getNewAdvice = async () => {
    try {
      const response = await findOne();
      console.log("Resposta da API inicial:", response);
      const conselho = response.data;

      if (conselho) {
        const translated = await traduzirConselho(conselho);
        setAdvice({ ...conselho, translatedAdvice: translated });
      } else {
        console.log("Conselho não encontrado na resposta:", conselho);
      }
    } catch (e) {
      console.log("Erro ao buscar conselho", e);
    }
  };

  const traduzirConselho = async (text) => {
    try {
      const translation = await translateText(text, "pt");
      return translation.responseData.translatedText;
    } catch (e) {
      console.log("Erro ao traduzir o conselho", e);
      return text;
    }
  };

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

  const getFavorites = async () => {
    try {
      const response = await userAdvices();

      if (response && Array.isArray(response)) {
        const favoriteList = response.map((item) => ({
          id: item.id,
          advice: item.advice.advice,
        }));

        setAdvices(favoriteList);
        console.log("Conselhos favoritos carregados:", favoriteList);
      } else {
        console.log("Nenhum conselho favorito encontrado.");
      }
    } catch (e) {
      console.log("Erro ao buscar conselhos favoritos", e);
    }
  };

  const handleDeleteUserAdvice = async (index) => {
    try {
      await deleteUserAdvice(index);
      getFavorites();
    } catch (e) {
      console.log("Erro ao deletar conselho favorito", e);
    }
  };

  useEffect(() => {
    getNewAdvice();
    getFavorites();
  }, []);

  return (
    <div className="api-container">
      <h1>Conselho para você:</h1>

      {advice ? (
        (
          <div key={advice.id}>
            <h2>{advice.translatedAdvice}</h2>
          </div>
        )
      ) : (
        <p>Carregando conselho...</p>
      )}

      <div className="button-container">
        <input
          type="button"
          onClick={getNewAdvice}
          value="Gerar Um Novo Conselho"
          className="new-advice-button"
        />
        <input
          type="button"
          onClick={handleLikeButtonClick}
          value="Curtir Conselho"
          className="new-advice-button"
        />
      </div>

      {advices.length > 0 && (
        <div className="favorites-container">
          <h3>Conselhos Favoritos:</h3>
          <ul>
            {advices.map((fav) => (
              <li key={fav.id}>
                {fav.advice}
                <button onClick={() => handleDeleteUserAdvice(fav.id)}>
                  Desfavoritar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}