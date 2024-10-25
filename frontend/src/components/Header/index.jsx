import { Link } from "react-router-dom";
import "./styles.css"; 
import { useContext } from "react";
import { AuthContext } from "../../auth/Context";

export default function Header() {
    const {token} = useContext(AuthContext)
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
          {token && <Link to="/favorites"><li>Favoritos</li></Link>  }
          
        </ul>
      </nav>
    </header>
  );
}
