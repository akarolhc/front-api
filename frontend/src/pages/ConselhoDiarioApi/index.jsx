import { translateText } from "../../api/translate";
import "./styles.css";
import { useState, useEffect } from "react";
import { createUserAdvice } from "../../api/advice";

const ConselhoDiarioApi = () => {
  const [dataAtual, setDataAtual] = useState("");
  const [advice, setAdvice] = useState("");
  const [translatedAdvice, setTranslatedAdvice] = useState("");

  async function buscarConselho() {
    const data = new Date();
    const dataFormatada = data.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setDataAtual(dataFormatada);

    const response = await fetch("https://api.adviceslip.com/advice");
    const responseJson = await response.json();
    setAdvice(responseJson.slip.advice);

    const responseTranslateText = await translateText(
      responseJson?.slip?.advice
    );

    setTranslatedAdvice(
      await responseTranslateText.responseData.translatedText
    );
  }

  useEffect(() => {
    buscarConselho();
  }, []);

  return (
    <div className="api-container">
      <strong>
        <p className="data">{dataAtual}</p>
      </strong>
      <p className="advice-text">
        {translatedAdvice ? translatedAdvice : "Carregando conselho..."}
      </p>
    </div>
  );
};

export default ConselhoDiarioApi;
