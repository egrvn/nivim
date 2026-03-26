import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

import "../styles/globals.css";

export function mount(element: ReactNode) {
  const root = document.getElementById("root");

  if (!root) {
    throw new Error("Root element #root not found");
  }

  createRoot(root).render(
    <StrictMode>
      {element}
    </StrictMode>,
  );
}
