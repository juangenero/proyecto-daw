import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContextProvider } from "./Context/AppContext";
import { BrowserRouter } from "react-router-dom"; // Enrutador
import { LoginContextProvider } from "../src/Context/LoginContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // Contexto de la aplicación para tener estados globales
  <AppContextProvider>
    <LoginContextProvider>
      {/** Enrutador del lado del cliente */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoginContextProvider>
  </AppContextProvider>
);
