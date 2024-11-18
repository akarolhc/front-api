import Footer from "./components/Footer";
import Header from "./components/Header";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import ConselhosDiarioApi from "./pages/ConselhoDiarioApi";
import User from "./pages/User";
import PrivateRoute from "./routes/PrivateRoute";
import Api from "./pages/Api/index";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./auth/Context";
import Admin from "./pages/Admin";
import Favoritos from "./pages/Favoritos";

function App() {
  const location = useLocation();

  return (
    <AuthProvider>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Header />
      )}

      <div className="content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
            <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/apis" element={<Api />} />
            <Route path="/conselho-diario" element={<ConselhosDiarioApi />} />
            <Route path="/favorites" element={<Favoritos />} />
            <Route path="/user" element={<User />} />
          </Route>

          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />
      {/* <ToastContainer />  */}
    </AuthProvider>
  );
}

export default App;
