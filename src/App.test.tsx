import { render, screen, fireEvent } from "@testing-library/react";

import App from "./App";

test("renders app", () => {
  render(<App />);
  expect(screen.getByText(/Calculation App/i)).toBeInTheDocument();

  const input1: HTMLInputElement = screen.getByLabelText(/Input 1/i);
  const input2: HTMLInputElement = screen.getByLabelText(/Input 2/i);
  expect(input1.value).toBe("0");
  expect(input2.value).toBe("0");
  expect(screen.queryByText(/Results/i)).not.toBeInTheDocument();
});

test("renders results on add", async () => {
  render(<App />);
  const input1: HTMLInputElement = screen.getByLabelText(/Input 1/i);
  const input2: HTMLInputElement = screen.getByLabelText(/Input 2/i);

  fireEvent.change(input1, {
    target: { value: "100" },
  });
  expect(input1.value).toBe("100");

  fireEvent.change(input2, {
    target: { value: "-1" },
  });
  expect(input2.value).toBe("-1");

  fireEvent(
    screen.getByText("Add"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  await screen.findByTestId("result");
  expect(screen.getByTestId("result").textContent).toBe("99");
});

test("renders results on subtract", async () => {
  render(<App />);
  const input1: HTMLInputElement = screen.getByLabelText(/Input 1/i);
  const input2: HTMLInputElement = screen.getByLabelText(/Input 2/i);

  fireEvent.change(input1, {
    target: { value: "8" },
  });
  expect(input1.value).toBe("8");

  fireEvent.change(input2, {
    target: { value: "100.5" },
  });
  expect(input2.value).toBe("100.5");

  fireEvent(
    screen.getByText("Subtract"),
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  await screen.findByTestId("result");
  expect(screen.getByTestId("result").textContent).toBe("-92.5");
});
