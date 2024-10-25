import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/Context"; 
import "./styles.css";

export default function Home() {
  const { logout } = useContext(AuthContext); // Usar a função de logout do contexto
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Executa a função de logout
    navigate("/login"); // Redireciona para a tela de login
  };

  return (
    <div className="home">
      <div className="header">
        <h1>Bem-vindo à API de Conselhos!</h1>
      </div>
      <p>Encontre conselhos motivacionais e dicas úteis para o seu dia a dia.</p>
      <div className="buttons">
        <Link to="/apis" className="home-button">
          Obter Conselho Aleatório
        </Link>
        <Link to="/conselho-diario" className="home-button">
          Obter Conselho do Dia
        </Link>
        <Link to="/about" className="home-button">
          Saiba Mais Sobre Nós
        </Link>
      </div>
      <div className="advice-highlight">
        <h2>Destaque do Dia</h2>
        <p>
          "A única maneira de fazer um ótimo trabalho é amar o que você faz."
          – Steve Jobs
        </p>
      </div>
    </div>
  );
}
