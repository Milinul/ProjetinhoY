import React, { useEffect, useState } from "react";
import "../Dashboard_dynamic/Dashboard_dynamic.css";
import Axios from "axios";
import { useParams } from 'react-router-dom';

export default function DashboardDynamic() {
  const { id_ala } = useParams();
  const [dashboardData, setDashboardData] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  const getDashboardData = () => {
    Axios.get(`http://localhost:3030/dashboard/${id_ala}`)
      .then((response) => {
        console.log('Response data:', response.data); // Verifique os dados recebidos
        setDashboardData(response.data);
      })
      .catch((error) => {
        console.error('Erro ao obter dados do dashboard dinâmico:', error);
      });
  };
  
  useEffect(() => {
    console.log('id_ala:', id_ala); // Verifique se id_ala está definido corretamente
    getDashboardData();
  }, [id_ala]);
  
  console.log('dashboardData:', dashboardData); // Verifique o estado após a atualização
  

  return (
    <div className="App">
      <h1>Patient Information</h1>
      {dashboardData.map((patient, index) => (
        <div
          key={index}
          className={`collapsible-card ${
            activeCard === index ? "active" : ""
          }`}
          onClick={() =>
            setActiveCard((prev) =>
              prev === index ? null : index
            )
          }
        >
          <div className="header">
            <span className="name">{patient.nome}</span>
            <div className="additional-info">
              <span>{`Age: ${patient.idade} years old`}</span>
              <span>{`Blood Type: ${patient.tipo_sanguineo}`}</span>
              <span>{`Situation: ${patient.situacao}`}</span>
              <span>{`Bed: ${patient.leitos}`}</span>
              <span>{`Wing: ${patient.nome_ala}`}</span>
            </div>
          </div>
          <div className="content">
            <div>
              <span>{`Diagnosis: ${patient.diagnostico}`}</span>
              <span>{`Report: ${patient.relatorio}`}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
