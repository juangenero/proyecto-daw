import { createContext } from "react";
import { useState } from "react";

// Crea un contexto para poder usar estados en el Login
export const PetsContext = createContext();

// Envoltorio para el login donde se usará el contexto definido anteriormente
export function PetsContextProvider(props) {
  // Listado de mascotas
  const [petsListIsLoading, setPetsListIsLoading] = useState(true); // Comprobar cuando está cargando la llamada a la API.
  const [petsListData, setPetsListData] = useState(null); // Guardar los datos obtenidos de la API.
  const [petsListError, setPetsListError] = useState(null);

  // Vista de mascotas
  const [petsViewIsLoading, setPetsViewIsLoading] = useState(true);
  const [petsViewData, setPetsViewData] = useState(null);
  const [petsViewError, setPetsViewError] = useState(null);
  const [petsConsultSelected, setPetsConsultSelected] = useState(null); // Almacenar consulta seleccionada

  // Edición de mascotas
  const [petEditIsLoading, setPetEditIsLoading] = useState(false);
  const [petEditData, setPetEditData] = useState(null);
  const [petEditMessage, setPetEditMessage] = useState(null);
  const [petEditError, setPetEditError] = useState(null);

  // Eliminar mascotas
  const [petDeleteModalShow, setPetDeleteModalShow] = useState(false); // Visualización de la ventana modal para eliminar usuarios.
  const [selectedPet, setSelectedPet] = useState(null); // Datos de la mascota a la que se ha hecho click desde la lista de mascota
  const [petDeleteIsLoading, setPetDeleteIsLoading] = useState(false); // Cargar llamada a la API.
  const [petDeleteError, setPetDeleteError] = useState(null); // Guardar mensajes de error.

  // Nueva mascota
  const [newPetModal, setNewPetModal] = useState(false);
  const [newPetIsLoading, setNewPetIsLoading] = useState(false);
  const [newPetData, setNewPetData] = useState(null);
  const [newPetUsers, setNewPetUsers] = useState(null);
  const [newPetError, setNewPetError] = useState(null);
  const [newPetMessage, setNewPetMessage] = useState(null);

  return (
    <PetsContext.Provider
      value={{
        // Listado de mascotas
        petsListIsLoading,
        setPetsListIsLoading,
        petsListData,
        setPetsListData,
        petsListError,
        setPetsListError,

        // Perfil de mascota
        petsViewIsLoading,
        setPetsViewIsLoading,
        petsViewData,
        setPetsViewData,
        petsViewError,
        setPetsViewError,
        petsConsultSelected,
        setPetsConsultSelected,

        // Editar mascota
        petEditIsLoading,
        setPetEditIsLoading,
        petEditData,
        setPetEditData,
        petEditMessage,
        setPetEditMessage,
        petEditError,
        setPetEditError,

        // Eliminar mascota
        petDeleteModalShow,
        setPetDeleteModalShow,
        selectedPet,
        setSelectedPet,
        petDeleteIsLoading,
        setPetDeleteIsLoading,
        petDeleteError,
        setPetDeleteError,

        // Nueva mascota
        newPetModal,
        setNewPetModal,
        newPetIsLoading,
        setNewPetIsLoading,
        newPetData,
        setNewPetData,
        newPetUsers,
        setNewPetUsers,
        newPetError,
        setNewPetError,
        newPetMessage,
        setNewPetMessage,
      }}
    >
      {props.children}
    </PetsContext.Provider>
  );
}
