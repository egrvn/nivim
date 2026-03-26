import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

import { CartProvider } from "../commerce/cart";
import "../styles/globals.css";

export function mount(element: ReactNode) {
  const root = document.getElementById("root");

  if (!root) {
    throw new Error("Root element #root not found");
  }

  createRoot(root).render(
    <StrictMode>
      <CartProvider>{element}</CartProvider>
    </StrictMode>,
  );
}
