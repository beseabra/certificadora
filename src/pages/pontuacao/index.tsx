"use client";
import ResponsiveAppBar from "@/components/Menu";
import questions from "@/list/questions";
import { Button } from "@mui/material";
import { useState } from "react";

export default function Pontuacao() {
  const [basicQuestions, setBasicQuestions] = useState(
    questions.filter((question) => question.nivel === "Básico")
  );
  const [intermediateQuestions, setIntermediateQuestions] = useState(
    questions.filter((question) => question.nivel === "Intermediário")
  );
  const [advancedQuestions, setAdvancedQuestions] = useState(
    questions.filter((question) => question.nivel === "Avançado")
  );

  const invertOrder = (level: any) => {
    switch (level) {
      case "Básico":
        setBasicQuestions([...basicQuestions].reverse());
        break;
      case "Intermediário":
        setIntermediateQuestions([...intermediateQuestions].reverse());
        break;
      case "Avançado":
        setAdvancedQuestions([...advancedQuestions].reverse());
        break;
      default:
        break;
    }
  };

  return (
    <>
      <ResponsiveAppBar />
      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", gap: "11.5rem", alignItems: "center" }}>
          <h1>Básico</h1>
          <Button variant="contained" onClick={() => invertOrder("Básico")}>
            Inverter Ordem
          </Button>
        </div>
        {basicQuestions.map((question, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: "1.5rem" }}>{question.title}</p>
            <p style={{ fontSize: "1.5rem" }}>{question.points}</p>
            <Button
              variant="contained"
              style={{ margin: "1rem", backgroundColor: "#426B1F" }}
            >
              Responder novamente
            </Button>
          </div>
        ))}
      </div>
      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", gap: "5rem", alignItems: "center" }}>
          <h1>Intermediário</h1>
          <Button
            variant="contained"
            onClick={() => invertOrder("Intermediário")}
          >
            Inverter Ordem
          </Button>
        </div>
        {intermediateQuestions.map((question, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: "1.5rem" }}>{question.title}</p>
            <p style={{ fontSize: "1.5rem" }}>{question.points}</p>
            <Button
              variant="contained"
              style={{ margin: "1rem", backgroundColor: "#426B1F" }}
            >
              Responder novamente
            </Button>
          </div>
        ))}
      </div>
      <div style={{ padding: "2rem" }}>
        <div style={{ display: "flex", gap: "8.5rem", alignItems: "center" }}>
          <h1>Avançado</h1>
          <Button variant="contained" onClick={() => invertOrder("Avançado")}>
            Inverter Ordem
          </Button>
        </div>
        {advancedQuestions.map((question, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ fontSize: "1.5rem" }}>{question.title}</p>
            <p style={{ fontSize: "1.5rem" }}>{question.points}</p>
            <Button
              variant="contained"
              style={{ margin: "1rem", backgroundColor: "#426B1F" }}
            >
              Responder novamente
            </Button>
          </div>
        ))}
      </div>
    </>
  );
}
