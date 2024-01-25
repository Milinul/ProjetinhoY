import React, { useEffect, useState } from "react"
import "../Dashboard/Dashboard.css";
import Axios from "axios"
import { Link } from 'react-router-dom'

export default function App() {

  //criaçõ de variaveis para serem usadas na requisição e mostrar os dados
  const [dashboardData, setDashboardData] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  //requisição
  const getDashboardData = () => {
    Axios.get('http://localhost:3030/dashboard')
      .then((response) => {
        console.log('Dados da API:', response.data);
  
        //filtro para mostrar as alas sem repetir
        const uniqueWards = Array.from(new Set(response.data.map(patient => patient.nome_ala)))
        console.log('Alas únicas:', uniqueWards);
  
        const uniqueData = uniqueWards.map(ward => response.data.find(patient => patient.nome_ala === ward))
        console.log('Dados filtrados:', uniqueData);
  
        setDashboardData(uniqueData);
      })
      .catch((error) => {
        console.error('Erro ao obter dados do dashboard:', error);
      });
  };  

  //função para pegar os dados do GET
  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="App">
      {/* Parte de cima da página */}
      <h1>Alas</h1>

      {/* Cria uma lista que busca e insere na página tudo o que está na tabela do banco */}
      {dashboardData.map((patient) => (
        <div
          key={patient.id}
          className={`collapsible-card ${
            activeCard === patient.id ? "active" : ""
          }`}

          /* Função para acionar algo quando clicar */
          onClick={() =>
            setActiveCard((prev) =>
              prev === patient.id ? null : patient.id
            )
          }
        >
          {/* Card */}
          <div className="header">
            {/* Quando ativado o Onclick, executa essa linha que leva para a página destinada */}
              <Link to={`/dashboard_dynamic/${patient.id_ala}`}>
                {patient.nome_ala}
              </Link>
            <span className="name"></span>
          </div>
        </div>
      ))}
    </div>
  );
}
