import { useState } from "react";

import "./App.css";

function App() {
  const [inputs, setInputs] = useState({ number1: "0", number2: "0" });
  const [result, setResult] = useState<number | null>(null);

  function onInputChange(event: { target: HTMLInputElement }) {
    setInputs((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  }

  function onAdd() {
    setResult(parseInt(inputs.number1) + parseInt(inputs.number2));
  }

  function onSubtract() {
    setResult(parseInt(inputs.number1) - parseInt(inputs.number2));
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

        <button onClick={onAdd}>Add</button>
        <button onClick={onSubtract}>Subtract</button>

        {result != null && (
          <div>
            Results: <span data-testid="result">{result}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
