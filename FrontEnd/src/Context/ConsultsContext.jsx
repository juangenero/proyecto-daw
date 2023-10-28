import { createContext } from "react";
import { useState } from "react";

export const ConsultContext = createContext();

export function ConsultContextProvider(props) {
  // Listado de consultas
  const [consultsListIsLoading, setConsultsListIsLoading] = useState(true);
  const [consultsListData, setConsultsListData] = useState(null);
  const [consultListError, setConsultsListError] = useState(null);

  // Nueva consulta
  const [newConsultModal, setNewConsultModal] = useState(false);
  const [newConsultIsLoading, setNewConsultIsLoading] = useState(false);
  const [newConsultData, setNewConsultData] = useState(null);
  const [newConsultError, setNewConsultError] = useState(null);

  // Vista de consulta
  const [consultsViewIsLoading, setConsultsViewIsLoading] = useState(true);
  const [consultsViewData, setConsultsViewData] = useState(null);
  const [consultViewError, setConsultsViewError] = useState(null);

  // Editar consulta
  // 1º llamada a la API, mostrar datos en el formulario
  const [consultEditShowInfoIsLoading, setConsultEditShowInfoIsLoading] = useState(true);
  const [consultEditShowInfoData, setConsultEditShowInfoData] = useState(null);
  const [consultEditShowInfoError, setConsultEditShowInfoError] = useState(null);
  //2º llamada a la API, enviar datos al servidor
  const [consultEditSubmitInfoIsLoading, setConsultEditSubmitInfoIsLoading] = useState(false);
  const [consultEditSubmitInfoMessage, setConsultEditSubmitInfoMessage] = useState(null);
  const [consultEditSubmitInfoError, setConsultEditSubmitInfoError] = useState(null);

  // Eliminar consulta
  const [consultDeleteModalShow, setConsultDeleteModalShow] = useState(false);
  const [consultDeleteIsLoading, setConsultDeleteIsLoading] = useState(false);
  const [consultDeleteError, setConsultDeleteError] = useState(null);
  const [selectedConsult, setSelectedConsult] = useState(null);

  return (
    <ConsultContext.Provider
      value={{
        // Listado de consultas
        consultsListIsLoading,
        setConsultsListIsLoading,
        consultsListData,
        setConsultsListData,
        consultListError,
        setConsultsListError,

        // Nueva consulta
        newConsultModal,
        setNewConsultModal,
        newConsultIsLoading,
        setNewConsultIsLoading,
        newConsultData,
        setNewConsultData,
        newConsultError,
        setNewConsultError,

        // Vista de consultas
        consultsViewIsLoading,
        setConsultsViewIsLoading,
        consultsViewData,
        setConsultsViewData,
        consultViewError,
        setConsultsViewError,

        // Editar consultas
        consultEditShowInfoIsLoading,
        setConsultEditShowInfoIsLoading,
        consultEditShowInfoData,
        setConsultEditShowInfoData,
        consultEditShowInfoError,
        setConsultEditShowInfoError,
        consultEditSubmitInfoIsLoading,
        setConsultEditSubmitInfoIsLoading,
        consultEditSubmitInfoMessage,
        setConsultEditSubmitInfoMessage,
        consultEditSubmitInfoError,
        setConsultEditSubmitInfoError,

        // Eliminar consulta
        consultDeleteModalShow,
        setConsultDeleteModalShow,
        consultDeleteIsLoading,
        setConsultDeleteIsLoading,
        consultDeleteError,
        setConsultDeleteError,
        selectedConsult,
        setSelectedConsult,
      }}
    >
      {props.children}
    </ConsultContext.Provider>
  );
}
