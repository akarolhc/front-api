import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/Context";
import "./styles.css"; 

export default function Header() {
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRedirectToUser = () => {
        navigate("/user"); // Redireciona para a página de usuário
    };

    return (
        <header id="exemplo">
            <h1>API CONSELHOS</h1>
            <nav className="menu">
                <ul>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/apis">
                        <li>Conselho Aleatório</li>
                    </Link>
                    <Link to="/conselho-diario">
                        <li>Conselho Diário</li>
                    </Link>
                    <Link to="/about">
                        <li>Sobre</li>
                    </Link>
                    {token && (
                        <Link to="/favorites">
                            <li>Favoritos</li>
                        </Link>
                    )}
                </ul>
            </nav>
            <div className="logout-container">
                <img
                    src="/public/imagem-logout.png" // Certifique-se de que o caminho da imagem está correto
                    alt="User Settings"
                    className="logout-icon"
                    onClick={handleRedirectToUser} // Chama apenas o redirecionamento
                />
            </div>
        </header>
    );
}
  