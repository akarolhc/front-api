import { Link } from "react-router-dom";
import "./styles.css"; 

export default function Home() {
  return (
    <div className="home">
      <h1>Bem-vindo à API de Conselhos!</h1>
      <p>Encontre conselhos motivacionais e dicas úteis para o seu dia a dia.</p>
      <div className="buttons">
        {/* Atualizar o caminho para '/apis' */}
        <Link to="/apis" className="home-button">
          Obter Conselho Aleatório
        </Link>
        <Link to="/about" className="home-button">
          Saiba Mais Sobre Nós
        </Link>
      </div>
      <div className="advice-highlight">
        <h2>Destaque do Dia</h2>
        <p>"A única maneira de fazer um ótimo trabalho é amar o que você faz." – Steve Jobs</p>
      </div>
    </div>
  );
}
