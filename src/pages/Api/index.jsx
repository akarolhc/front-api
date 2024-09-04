import { useEffect, useState } from 'react';
import './styles.css';

const mockResults = [
    {"id": 1, "advice": "Lembre-se de que as aranhas têm mais medo de você do que você delas.", "date": "2015-05-26"},
    {"id": 2, "advice": "Sorria e o mundo sorri com você. Franza a testa e você estará por sua conta.", "date": "2015-11-18"},
    {"id": 3, "advice": "Não coma neve que não seja da cor da neve.", "date": "2013-11-25"}
];

export default function Api() {
    const [conteudo, setConteudo] = useState(<>Carregando...</>);

    async function carregarConselhos() {
        return mockResults;
    }

    async function listarConselhos() {
        const conselhos = await carregarConselhos();
        return conselhos.map(item => (
            <p key={item.id}>{item.advice} ({item.date})</p>
        ));
    }

    useEffect(() => {
        async function getConteudo() {
            setConteudo(await listarConselhos());
        }
        getConteudo();
    },[]);

    return (
        <div className='lista-principal'>
            {conteudo}
        </div>
    );
}
