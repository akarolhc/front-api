import { useEffect, useState } from "react";
import "./styles.css";
import { findOne, createUserAdvice } from "../../api/advice";
import { translateText } from "../../api/translate";

export default function Api() {
  const [advice, setAdvice] = useState(null);
  const getNewAdvice = async () => {
    try {
      const response = await findOne();

      const conselho = response.data;

      if (conselho) {
        const translated = await traduzirConselho(conselho.advice);
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
        await createUserAdvice(advice);
      } catch (e) {
        console.log("Erro ao adicionar o conselho aos favoritos", e);
      }
    }
    getNewAdvice();
  };

  useEffect(() => {
    getNewAdvice();
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
    </div>
  );
}