import { createContext } from "react";
import { useState } from "react";
import { decodeJWT } from "../Services/auth.service.js";

// Crea un contexto para poder usar estados globales en toda la aplicación, independientemente del cantidad de componentes anidados en el DOM
export const AppContext = createContext();

// Envoltorio para la aplicación donde se usará el contexto definido anteriormente
export function AppContextProvider(props) {
  // Estados compartidos de forma global
  const [user, setUser] = useState(decodeJWT());

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {props.children}
    </AppContext.Provider>
  );
}
