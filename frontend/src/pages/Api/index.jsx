import { useEffect, useState } from 'react';
import './styles.css';
import { deleteAdvice, getAdvices } from '../../api/advice';

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
        const newAdvice = await getAdvices();
        setAdvice(newAdvice);

        // Traduz o conselho
        if (newAdvice) {
            const translated = await translateText(newAdvice, 'pt');
            setTranslatedAdvice(translated);
        } else {
            setTranslatedAdvice('Não foi possível carregar o conselho.');
        }
    };

    const alterarConselho = async () => {
        const newAdvice = await getAdvices();
        setAdvice(newAdvice);

        // Traduz o conselho
        if (newAdvice) {
            const translated = await translateText(newAdvice, 'pt');
            setTranslatedAdvice(translated);
        } else {
            setTranslatedAdvice('Não foi possível carregar o conselho.');
        }
    };

    const deletarConselho = async () => {
        deleteAdvice(advice.id)
    };

    useEffect(() => {
        getNewAdvice(); 
    }, []);

    return (
        <div className="api-container">
            <h1>Conselho para você:</h1>
            <p className="advice-text">{translatedAdvice ? translatedAdvice : 'Carregando conselho...'}</p>
            
            <div className="button-container">
                <input 
                    type="button" 
                    onClick={getNewAdvice} 
                    value="Gerar Um Novo Conselho" 
                    className="new-advice-button" 
                />
                <input 
                    type="button" 
                    onClick={alterarConselho} 
                    value="Modificar Conselho" 
                    className="new-advice-button" 
                />
                <input 
                    type="button" 
                    onClick={deletarConselho} 
                    value="Deletar Conselho" 
                    className="new-advice-button" 
                />
            </div>
        </div>
    );
};

export default Api;
