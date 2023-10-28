import { createContext } from "react";
import { useState } from "react";

// Crea un contexto para poder usar estados en el Login
export const VaccineContext = createContext();

// Envoltorio para el login donde se usará el contexto definido anteriormente
export function VaccineContextProvider(props) {
  // Listado de vacunas
  const [vaccineListIsLoading, setVaccineListIsLoading] = useState(true);
  const [vaccineListData, setVaccineListData] = useState(null);
  const [vaccineListError, setVaccineListError] = useState(null);

  // Vista de vacunas
  const [vaccineViewIsLoading, setVaccineViewIsLoading] = useState(true);
  const [vaccineViewData, setVaccineViewData] = useState(null);
  const [vaccineViewError, setVaccineViewError] = useState(null);

  // Edición de vacunas
  // 1º llamada a la API, mostrar datos en el formulario
  const [vaccineEditShowInfoIsLoading, setVaccineEditShowInfoIsLoading] = useState(true);
  const [vaccineEditShowInfoData, setVaccineEditShowInfoData] = useState(null);
  const [vaccineEditShowInfoError, setVaccineEditShowInfoError] = useState(null);
  //2º llamada a la API, enviar datos al servidor
  const [vaccineEditSubmitInfoIsLoading, setVaccineEditSubmitInfoIsLoading] = useState(false);
  const [vaccineEditSubmitInfoMessage, setVaccineEditSubmitInfoMessage] = useState(null);
  const [vaccineEditSubmitInfoError, setVaccineEditSubmitInfoError] = useState(null);

  // Eliminar vacunas
  const [vaccineDeleteModal, setVaccineDeleteModal] = useState(false);
  const [vaccineDeleteIsLoading, setVaccineDeleteIsLoading] = useState(false);
  const [vaccineDeleteError, setVaccineDeleteError] = useState(null);
  const [selectedVaccine, setSelectedVaccine] = useState(null);

  // Nueva vacuna
  const [newVaccineModal, setNewVaccineModal] = useState(false);
  const [newVaccineIsLoading, setNewVaccineIsLoading] = useState(false);
  const [newVaccineData, setNewVaccineData] = useState(null);
  const [newVaccineError, setNewVaccineError] = useState(null);
  const [newVaccineMessage, setNewVaccineMessage] = useState(null);

  return (
    <VaccineContext.Provider
      value={{
        // Listado de vacunas
        vaccineListIsLoading,
        setVaccineListIsLoading,
        vaccineListData,
        setVaccineListData,
        vaccineListError,
        setVaccineListError,

        // Vista de vacuna
        vaccineViewIsLoading,
        setVaccineViewIsLoading,
        vaccineViewData,
        setVaccineViewData,
        vaccineViewError,
        setVaccineViewError,

        // Edición de vacunas
        vaccineEditShowInfoIsLoading,
        setVaccineEditShowInfoIsLoading,
        vaccineEditShowInfoData,
        setVaccineEditShowInfoData,
        vaccineEditShowInfoError,
        setVaccineEditShowInfoError,
        vaccineEditSubmitInfoIsLoading,
        setVaccineEditSubmitInfoIsLoading,
        vaccineEditSubmitInfoMessage,
        setVaccineEditSubmitInfoMessage,
        vaccineEditSubmitInfoError,
        setVaccineEditSubmitInfoError,

        // Eliminar vacunas
        vaccineDeleteModal,
        setVaccineDeleteModal,
        vaccineDeleteIsLoading,
        setVaccineDeleteIsLoading,
        vaccineDeleteError,
        setVaccineDeleteError,
        selectedVaccine,
        setSelectedVaccine,

        // Nueva vacuna
        newVaccineModal,
        setNewVaccineModal,
        newVaccineIsLoading,
        setNewVaccineIsLoading,
        newVaccineData,
        setNewVaccineData,
        newVaccineError,
        setNewVaccineError,
        newVaccineMessage,
        setNewVaccineMessage,
      }}
    >
      {props.children}
    </VaccineContext.Provider>
  );
}
