import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../auth/Context";
import "./styles.css";

export default function Header() {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRedirectToUser = () => {
    navigate("/user");
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
          {role === "admin" && token && (
            <>
              <Link to="/users"><li>Usuários</li></Link>
              <Link to="/advices"><li>Conselhos</li></Link>
            </>
          )}
          {token && (
            <li className="logout" onClick={logout}>
              Logout
            </li>
          )}
        </ul>
      </nav>
      <div className="logout-container">
        <img
          src="/public/imagem-logout.png"
          alt="User Settings"
          className="logout-icon"
          onClick={handleRedirectToUser}
        />
      </div>
    </header>
  );
}
