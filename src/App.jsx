import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Api from "./pages/Api";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Header />
      <div className='content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/apis' element={< Api/>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
