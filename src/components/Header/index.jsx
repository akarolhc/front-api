import { Link } from "react-router-dom";
import "./styles.css";

export default function Header() {
  return (
    <header id="exemplo">
      <h1>Minha Página HTML Básica</h1>
      <nav className="menu">
        <ul>
          <Link to="/login">
            <li>Login</li>
          </Link>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/apis">
            <li>Conselho Aleatório</li>
          </Link>
          <Link to="/conselhos">
            <li>Conselho do Dia</li>
          </Link>
          <Link to="/about">
            <li>Sobre</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}
