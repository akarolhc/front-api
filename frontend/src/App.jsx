import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import ConselhosDiarioApi from "./pages/ConselhoDiarioApi";
import { AuthProvider } from "./auth/Context";
import PrivateRoute from "./routes/PrivateRoute";
import Api from "./pages/Api";
import Register from "./pages/Register"; // Importando a página de registro

function App() {
  const location = useLocation();  

  return (
    <AuthProvider>
      {location.pathname !== '/login' && location.pathname !== '/register' && <Header />}
      
      <div className='content'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} /> {/* Rota para a página de registro */}
          
          <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} /> 
            <Route path='/apis' element={<Api />} />
            <Route path='/conselho-diario' element={<ConselhosDiarioApi />} />
          </Route>

          <Route path='/about' element={<About />} /> 
        </Routes>
      </div>
      
      {/* MOSTRA O FOOTER EM TUDO */}
      <Footer />
    </AuthProvider>
  );
}

export default App;
