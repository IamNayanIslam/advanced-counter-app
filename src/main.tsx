import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CountersContextProvider } from "./Contexts/CountersContext.tsx";
import { Toaster } from "react-hot-toast";
import { ThemesContextProvider } from "./Contexts/ThemseContext.tsx";
import { SettingsContextProvider } from "./Contexts/SettingsContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CountersContextProvider>
    <ThemesContextProvider>
      <SettingsContextProvider>
        <Toaster />
        <App />
      </SettingsContextProvider>
    </ThemesContextProvider>
  </CountersContextProvider>,
);
