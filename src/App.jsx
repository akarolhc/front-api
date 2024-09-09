import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import ConselhosDiarioApi from "./pages/ConselhoDiarioApi";
import Api from "./pages/Api";


function App() {
  const location = useLocation();  

  return (
    <>
      <Header /> 
      <div className='content'>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} /> 
          <Route path='/about' element={<About />} /> 
          <Route path='/api-conselho' element={<ConselhosDiarioApi />} /> 
          <Route path='/apis' element={< Api />} />
        </Routes>
      </div>
      {location.pathname === "/login" && <Footer />} 
      {location.pathname !== '/login' && <Footer />} 
    </>
  );
}

export default App;
