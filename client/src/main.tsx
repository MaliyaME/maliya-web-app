import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initializeTheme, ThemeProvider } from "@/hooks/use-theme";

initializeTheme();

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>,
);
