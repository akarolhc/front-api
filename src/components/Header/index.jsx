import { Link } from 'react-router-dom'
import './styles.css'

export default function Header (){
    return(

          <header id="exemplo">
        <h1>Minha Página HTML Básica</h1>
        <nav className='menu'>
            <ul>
                <Link to="/">
                <li>Home</li>
                </Link>
                <Link to="/apis">
                <li>API</li>
                </Link>
            </ul>
        </nav>
    </header>
    );
}