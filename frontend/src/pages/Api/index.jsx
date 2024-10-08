import { useEffect, useState } from 'react';
import './styles.css';

async function translateText(text, targetLang = 'pt') {
    try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
        const data = await response.json();

        if (data.responseStatus === 429) {
            throw new Error("429 too many requests");
        }
        return data.responseData.translatedText;
    } catch (error) {
        console.error('Erro ao traduzir:', error);
        return text;
    }
}

// Busca o conselho
const fetchAdvice = async () => {
    try {
        const response = await fetch('https://api.adviceslip.com/advice');
        const data = await response.json();
        return data.slip.advice;
    } catch (error) {
        console.error('Erro ao buscar conselho', error);
        return null;
    }
};

const Api = () => {
    const [advice, setAdvice] = useState(''); 
    const [translatedAdvice, setTranslatedAdvice] = useState(''); 

    // Função que busca um novo conselho
    const getNewAdvice = async () => {
        const newAdvice = await fetchAdvice();
        setAdvice(newAdvice);

        // Traduz o conselho
        if (newAdvice) {
            const translated = await translateText(newAdvice, 'pt');
            setTranslatedAdvice(translated);
        } else {
            setTranslatedAdvice('Não foi possível carregar o conselho.');
        }
    };

    useEffect(() => {
        getNewAdvice(); 
    }, []);

    return (
        <div className="api-container">
            <h1>Conselho para você:</h1>
            <p className="advice-text">{translatedAdvice ? translatedAdvice : 'Carregando conselho...'}</p>
            <button onClick={getNewAdvice} className="new-advice-button">
                Gerar Novo Conselho
            </button>
        </div>
    );
};

export default Api;
