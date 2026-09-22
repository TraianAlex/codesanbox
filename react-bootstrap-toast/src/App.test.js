import { createRoot } from "react-dom/client";
import { act } from "react";
import App from "./App";

it("renders without crashing", async () => {
  const div = document.createElement("div");
  document.body.appendChild(div);

  const root = createRoot(div);
  await act(async () => {
    root.render(<App />);
  });
  await act(async () => {
    root.unmount();
  });

  document.body.removeChild(div);
});
