import { useState } from "react";

import "./App.css";
import axios from "./utils/axios";

// Maps to API endpoint
enum CalculationType {
  Add = "add",
  Subtract = "subtract",
}

function App() {
  const [inputs, setInputs] = useState({ number1: "0", number2: "0" });
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onInputChange(event: { target: HTMLInputElement }) {
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  function getNumber(num: string) {
    return num === "" ? 0 : parseFloat(num);
  }

  async function onCalculate(calculationType: CalculationType) {
    setError(null);
    try {
      const result = await axios.post(
        calculationType,
        JSON.stringify({
          number1: getNumber(inputs.number1),
          number2: getNumber(inputs.number2),
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );
      setResult(result.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }

  return (
    <div className="App">
      <div className="App-content">
        <h1>Calculation App</h1>
        <label>
          Input 1:
          <input
            type="number"
            name="number1"
            value={inputs.number1}
            onChange={onInputChange}
          />
        </label>
        <label>
          Input 2:
          <input
            type="number"
            name="number2"
            value={inputs.number2}
            onChange={onInputChange}
          />
        </label>

        <button onClick={() => onCalculate(CalculationType.Add)}>Add</button>
        <button onClick={() => onCalculate(CalculationType.Subtract)}>
          Subtract
        </button>

        {result != null && !error && (
          <div>
            Results: <span data-testid="result">{result}</span>
          </div>
        )}
        {error && <div className="Error-label">{error}</div>}
      </div>
    </div>
  );
}

export default App;
