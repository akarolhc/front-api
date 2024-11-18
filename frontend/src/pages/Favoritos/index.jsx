import React, { useState, useEffect } from 'react';
import './styles.css'; 
import { userAdvices } from '../../api/advice';


const FavoritesPage = () => {
  const [advices, setAdvices] = useState([]);


  const getFavorites = async () => {
    try {
      const result = await userAdvices();
      console.log("Resposta da API (result):", result); 

      if (result && Array.isArray(result)) {
        const favoriteList =result.map((item) => ({
          id: item.id,
          advice: item.advice?.advice || item.advice || "Conselho indisponível", 
        }));
        
        setAdvices(favoriteList);
        console.log("Lista de conselhos favoritos carregada:", favoriteList); 
      } else {
        console.warn("Nenhum conselho favorito encontrado ou a resposta não é um array.");
      }
    } catch (error) {
      console.error("Erro ao buscar conselhos favoritos:", error); 
    }
  };

  // Chama a função getFavorites quando o componente carrega
  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div className="favorites-page">
      <h1>Conselhos Favoritos</h1>
      {advices.length > 0 ? (
        <ul>
          {advices.map((advice) => (
            <li key={advice.id}>
              {advice.advice}
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
