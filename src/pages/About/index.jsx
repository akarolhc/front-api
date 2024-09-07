import './styles.css';
import { Link } from 'react-router-dom';


export default function About() {
  
    return (

        <div className="about">

            <h1>API</h1>
            <p>Advice Slip JSON API</p>
            <p>API de conselhos aleatórios</p>
            <p>A Advice Slip API fornece conselhos aleatórios sob demanda em formato JSON. É uma API simples e gratuita que pode ser usada para integrar frases motivacionais ou dicas de vida em aplicativos e sites.</p>
            <p>Principais funcionalidades incluem:</p>
            <ul>
                <li>Obtenção de conselhos aleatórios com uma única requisição.</li>
                <li>Busca de conselhos específicos utilizando termos de pesquisa.</li>
                <li>Sistema de resposta leve e otimizado para aplicações web.</li>
            </ul>

            <Link to="/home">Voltar para Home</Link> 
        </div>
    )
}
