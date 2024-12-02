import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import PrivateRoute from "../../routes/PrivateRoute";
import "./styles.css";

export default function Layout() {
  return (
    <div className="estrutura">
      <Header />
      <div className="content">
        <PrivateRoute />
      </div>
      <Footer />
    </div>
  );
}