import { useEffect, useState } from 'react';
import './styles.css';    
import { createAdvice, findAdvices } from '../../api/advice';
import { translateText } from '../../api/translate';

export default function Api (){
    const [showAdvice, setShowAdvice] = useState(false);
    const [conselhosSalvos, setConselhosSalvos] = useState([]);
    const [advice, setAdvice] = useState('');
    const [translatedAdvice, setTranslatedAdvice] = useState('');

    // esse useeffect é para salvar os conselhos salvos no localstorage
    useEffect(() => {
        const conselhosSallvos = JSON.parse(localStorage.getItem('conselhos')) || [];
        setConselhosSalvos(conselhosSallvos);
    }, []);

    //useeffect usado sempre que o conselhosSalvos muda
    useEffect(() => {
        localStorage.setItem('conselhos', JSON.stringify(conselhosSalvos));
    }, [conselhosSalvos]);


    const toogleAdvice = () => {
        setShowAdvice(!showAdvice);
    };

    const hadleButtonClick = async () => {
        const newAdvice = document.getElementById('new-advice').value.trim();

        if (newAdvice !== '') {
            setConselhosSalvos([...conselhosSalvos, newAdvice]);
            document.getElementById('new-advice').value = '';
         
            try{
            const newAdvice = await createAdvice(token, {
                advice: newAdvice
            });

            setAdvice((newAdvice) =>[...prevAdvice, newAdvice]);
            document.getElementById('new-advice').value = '';
            alert('Conselho salvo com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar conselho', error);
            alert('Erro ao salvar conselho. Tente novamente.');
        }
    } else {
        alert('Por favor, insira um conselho antes de salvar.');
    }
    };
    // Função que busca um novo conselho
    const getNewAdvice = async () => {
        const{results} = await findAdvices();

        const ramdomNumber = Math.floor(Math.random() * results.length);
        
        setAdvice(results[ramdomNumber].advice);

        // Traduz o conselho
            const translated = await translateText(results[ramdomNumber].advice);
            setTranslatedAdvice(translated.responseData.translatedText);        
    };

    

    const alterarConselho = async () => {
        const newAdvice = await findAdvices();
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
            <p className="advice-text">{translatedAdvice}</p>
            
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
                <input 
                    type="button" 
                    onClick={hadleButtonClick} 
                    value="Publicar Conselho" 
                    className="new-advice-button" 
                />
            </div>
        </div>
    );
};


