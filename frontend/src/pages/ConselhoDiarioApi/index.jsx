import './styles.css';
import { useState, useEffect } from "react";

// funcao de traduzir o bgl
async function translateText(text, targetLang = 'pt') {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();

        if(data.responseStatus === 429) {
            throw new Error("429 too many request")
        }
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Erro ao traduzir:', error);
        return text;
    }
}

const ConselhoDiarioApi = () => {
  const [dataAtual, setDataAtual] = useState("");
  const [advice, setAdvice] = useState("");
  const [translatedAdvice, setTranslatedAdvice] = useState(""); 

  useEffect(() => {

    async function exemplo() {
        const data = new Date();
        const dataFormatada = data.toLocaleDateString("pt-BR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        setDataAtual(dataFormatada);
    
        //buscar conselho da API e depois traduzir
        const response = await fetch('https://api.adviceslip.com/advice')
        const responseJson = await response.json()
        setAdvice(responseJson.slip.advice)
    
        //traduz o conselho para português
        setTranslatedAdvice(await translateText(responseJson.slip.advice, 'pt'));    
    }

    exemplo()
  }, []);

  return (
    <div className="api-container">
      <strong>
        <p className="data">{dataAtual}</p>
      </strong>
      <p className="advice-text">{translatedAdvice ? translatedAdvice : 'Carregando conselho...'}</p>
    </div>
  );
};

export default ConselhoDiarioApi;