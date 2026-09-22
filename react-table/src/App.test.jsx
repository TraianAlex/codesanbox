import { render, screen } from "@testing-library/react";
import App from "./App";

it("renders the users table", () => {
  render(<App />);
  expect(screen.getByText("Users")).toBeInTheDocument();
});
