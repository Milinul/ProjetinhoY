import React, { useEffect, useState } from "react";
import "../Dashboard_dynamic/Dashboard_dynamic.css";
import Axios from "axios";
import { useParams } from 'react-router-dom';

export default function DashboardDynamic() {
  const { id_ala } = useParams();
  const [dashboardData, setDashboardData] = useState([]);
  const [activeCard, setActiveCard] = useState(null);

  const getDashboardData = () => {
    Axios.get(`http://localhost:3002/dashboard/${id_ala}`)
        .then((response) => {
            setDashboardData(response.data);
        })
        .catch((error) => {
            console.error('Erro ao obter dados do dashboard dinâmico:', error);
        });
  };

  useEffect(() => {
    getDashboardData();
  }, [id_ala]);

  return (
    <div className="App">
      <h1>Patient Information</h1>
      {dashboardData.map((patient) => (
        <div
          key={patient.id}
          className={`collapsible-card ${
            activeCard === patient.id ? "active" : ""
          }`}
          onClick={() =>
            setActiveCard((prev) =>
              prev === patient.id ? null : patient.id
            )
          }
        >
          <div className="header">
            <span className="name">{patient.nome}</span>
            <div className="additional-info">
              <span>{`Age: ${patient.idade} years old`}</span>
              <span>{`Blood Type: ${patient.tipo_sanguineo}`}</span>
              <span>{`Situation: ${patient.situacao}`}</span>
              <span>{`Bed: ${patient.leito}`}</span>
              <span>{`Wing: ${patient.ala}`}</span>
              <span>{`TESTE DA VIEW: ${patient.test}`}</span>
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
