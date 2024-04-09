import ResponsiveAppBar from "@/components/Menu";
import { Button, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <ResponsiveAppBar />
      <div style={{ padding: "3.2rem", fontSize: "1.3rem" }}>
        <p>Ola, Fulano </p>
        <p>Responda a questão abaixo:</p>
      </div>

      <div
        style={{ padding: "3.2rem", textAlign: "center", fontSize: "1.1rem" }}
      >
        <p>
          Um fazendeiro tem um campo quadrado com cada lado medindo 50 metros.
          Ele quer construir uma cerca ao redor do campo. Se ele precisa
          economizar dinheiro e quer usar a menor quantidade possível de cerca,
          quantos metros de cerca ele precisa comprar?
        </p>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          style={{ justifyContent: "center", marginTop: "2rem" }}
        >
          <FormControlLabel
            value="alternativa1"
            control={<Radio />}
            label="alternativa1"
          />
          <FormControlLabel
            value="alternativa2"
            control={<Radio />}
            label="alternativa3"
          />
          <FormControlLabel
            value="alternativa3"
            control={<Radio />}
            label="alternativa3"
          />
          <FormControlLabel
            value="alternativa4"
            control={<Radio />}
            label="alternativa4"
          />
        </RadioGroup>
        <div>
          <Button
            variant="contained"
            style={{
              margin: "1rem",
              width: "9rem",
              backgroundColor: "#E9CA23",
            }}
          >
            Dica
          </Button>
          <Button
            variant="contained"
            style={{ margin: "1rem", backgroundColor: "#426B1F" }}
          >
            Enviar Resposta
          </Button>
        </div>
      </div>
    </>
  );
}
