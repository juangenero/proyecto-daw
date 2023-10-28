import { createContext } from "react";
import { useState } from "react";

// Crea un contexto para poder usar estados en el Login
export const VaccineAplicationsContext = createContext();

// Envoltorio para el login donde se usará el contexto definido anteriormente
export function VaccineAplicationsContextProvider(props) {
  // Añadir aplicación de vacuna
  const [newVaccineAplicationsModal, setNewVaccineAplicationsModal] = useState(false);
  const [newVaccineAplicationsIsLoading, setNewVaccineAplicationsIsLoading] = useState(false);
  const [newVaccineAplicationsData, setNewVaccineAplicationsData] = useState(null);
  const [newVaccineAplicationsError, setNewVaccineAplicationsError] = useState(null);

  // Eliminar aplicación de vacuna
  const [deleteVaccineAplicationsModal, setDeleteVaccineAplicationsModal] = useState(false);
  const [deleteVaccineAplicationsIsLoading, setDeleteVaccineAplicationsIsLoading] = useState(false);
  const [deleteVaccineAplicationsError, setDeleteVaccineAplicationsError] = useState(null);
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  return (
    <VaccineAplicationsContext.Provider
      value={{
        // Añadir aplicación de vacuna
        newVaccineAplicationsModal,
        setNewVaccineAplicationsModal,
        newVaccineAplicationsIsLoading,
        setNewVaccineAplicationsIsLoading,
        newVaccineAplicationsData,
        setNewVaccineAplicationsData,
        newVaccineAplicationsError,
        setNewVaccineAplicationsError,

        // Eliminar aplicación de vacuna
        deleteVaccineAplicationsModal,
        setDeleteVaccineAplicationsModal,
        deleteVaccineAplicationsIsLoading,
        setDeleteVaccineAplicationsIsLoading,
        deleteVaccineAplicationsError,
        setDeleteVaccineAplicationsError,
        selectedVaccine,
        setSelectedVaccine,
      }}
    >
      {props.children}
    </VaccineAplicationsContext.Provider>
  );
}
