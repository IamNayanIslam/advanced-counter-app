import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CountersContextProvider } from "./Contexts/CountersContext.tsx";
import { Toaster } from "react-hot-toast";
import { ThemesContextProvider } from "./Contexts/ThemseContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CountersContextProvider>
    <ThemesContextProvider>
      <Toaster />
    <App />
    </ThemesContextProvider>
  </CountersContextProvider>,
);
