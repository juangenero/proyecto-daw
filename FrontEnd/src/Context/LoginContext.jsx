import { createContext } from "react";
import { useState } from "react";

// Crea un contexto para poder usar estados en el Login
export const LoginContext = createContext();

// Envoltorio para el login donde se usará el contexto definido anteriormente
export function LoginContextProvider(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <LoginContext.Provider value={{ modalShow, setModalShow }}>
      {props.children}
    </LoginContext.Provider>
  );
}
