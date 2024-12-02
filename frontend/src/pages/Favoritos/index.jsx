import React, { useState, useEffect } from "react";
import "./styles.css";
import { userAdvices, deleteUserAdvice } from "../../api/advice";

const FavoritesPage = () => {
  const [advices, setAdvices] = useState([]);

  const getFavorites = async () => {
    try {
      const result = await userAdvices();

      if (result && Array.isArray(result)) {
        const favoriteList = result.map((item) => ({
          id: item.id,
          advice: item.advice?.advice || item.advice || "Conselho indisponível",
        }));

        setAdvices(favoriteList);
        console.log("Lista de conselhos favoritos carregada:", favoriteList);
      } else {
        console.warn(
          "Nenhum conselho favorito encontrado ou a resposta não é um array."
        );
      }
    } catch (error) {
      console.error("Erro ao buscar conselhos favoritos:", error);
    }
  };

  const handleDeleteUserAdvice = async (index) => {
    try {
      await deleteUserAdvice(index);
      getFavorites();
    } catch (e) {
      console.log("Erro ao deletar conselho favorito", e);
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="favorites-page">
      <h1>Conselhos Favoritos</h1>
      {advices.length > 0 ? (
        <ul>
          {advices.map((index) => (
            <li key={index.id}>
              {index.advice}
              <button onClick={() => handleDeleteUserAdvice(index.id)}>
                💔
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum conselho favorito encontrado.</p>
      )}
    </div>
  );
};

export default FavoritesPage;
