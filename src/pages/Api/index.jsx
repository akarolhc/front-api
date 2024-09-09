import { useEffect, useState } from 'react';
import './styles.css';

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

    const getNewAdvice = async () => {
        const newAdvice = await fetchAdvice();
        setAdvice(newAdvice);
    };

    useEffect(() => {
        getNewAdvice(); // Chama a função quando o componente é montado
    }, []);

    return (
        <div className="api-container">
            <h1>Conselho para você:</h1>
            <p className="advice-text">{advice ? advice : 'Carregando conselho...'}</p>
            {/* Adiciona o botão para gerar um novo conselho */}
            <button onClick={getNewAdvice} className="new-advice-button">
                Gerar Novo Conselho
            </button>
        </div>
    );
};

export default Api;
