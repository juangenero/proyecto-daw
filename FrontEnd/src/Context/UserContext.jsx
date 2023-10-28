import { createContext } from "react";
import { useState } from "react";

// Crea un contexto para poder usar estados en la opción de usuarios
export const UserContext = createContext();

// Envoltorio para la opción de usuarios donde se usará el contexto definido anteriormente
export function UserContextProvider(props) {
  // ESTADOS (LISTA DE USUARIOS)
  const [userListIsLoading, setUserListIsLoading] = useState(true); // Comprobar cuando está cargando la llamada a la API.
  const [userListData, setUserListData] = useState(null); // Guardar los datos obtenidos de la API.
  const [userListError, setUserListError] = useState(null); // Guardar los errores.

  // ESTADOS (CREAR DE USUARIOS)
  const [newUserModalShow, setNewUserModalShow] = useState(false); // Mostrar modal para crear un nuevo usuario.
  const [newUserIsLoading, setNewUserIsLoading] = useState(false); // Comprobar cuando está cargando la llamada a la API.
  const [newUserData, setNewUserData] = useState(null); // Datos del formulario que se enviarán al servidor
  const [newUserError, setNewUserError] = useState(null); // Mensaje para mostrar al usuario

  // ESTADOS (PERFIL DE USUARIO)
  const [userViewIsLoading, setUserViewIsLoading] = useState(true); // Comprobar cuando está cargando la llamada a la API.
  const [userViewData, setUserViewData] = useState(null); // Almacena los datos recibidos de la API.
  const [userViewError, setUserViewError] = useState(null); // Almacena posibles errores

  // ESTADOS (EDITAR USUARIO)
  // 1º llamada a la API, para rellenar el formulario
  const [userEditShowInfoIsLoading, setUserEditShowInfoIsLoading] = useState(true); // Comprobar cuando está cargando la llamada a la API.
  const [userEditShowInfoData, setUserEditShowInfoData] = useState(null); // Almacena los datos que se usa para el formulario
  const [userEditShowInfoError, setUserEditShowInfoError] = useState(null); // Almacena posibles errores
  // 2º llamada a la API, para enviar el formulario
  const [userEditSubmitInfoIsLoading, setUserEditSubmitInfoIsLoading] = useState(false); // Comprobar cuando está cargando la llamada a la API.
  const [userEditSubmitInfoData, setUserEditSubmitInfoData] = useState(false); // Guardar los valores introducidos en el formulario
  const [userEditSubmitInfoMessage, setUserEditSubmitInfoMessage] = useState(null); // Guardar resultado de la edición
  const [userEditSubmitInfoError, setUserEditSubmitInfoError] = useState(null); // Guardar posibles errores

  // ESTADOS (ELIMINAR USUARIO)
  const [deleteWarningModalShow, setDeleteWarningModalShow] = useState(false); // Modal para avisar que no se puede eliminar el usuario.
  const [userDeleteModalShow, setUserDeleteModalShow] = useState(false); // Visualización de la ventana modal para eliminar usuarios.
  const [selectedUser, setSelectedUser] = useState(null); // Datos del usuario que se ha hecho click desde UserList
  const [userDeleteIsLoading, setUserDeleteIsLoading] = useState(false); // Cargar llamada a la API.
  const [userDeleteError, setUserDeleteError] = useState(null); // Guardar mensajes de error.

  return (
    <UserContext.Provider
      value={{
        userDeleteModalShow,
        setUserDeleteModalShow,
        selectedUser,
        setSelectedUser,

        // Listado de usuarios
        userListIsLoading,
        setUserListIsLoading,
        userListData,
        setUserListData,
        userListError,
        setUserListError,

        // Nuevo usuario
        newUserIsLoading,
        setNewUserIsLoading,
        newUserError,
        setNewUserError,
        newUserModalShow,
        setNewUserModalShow,

        // Editar usuario
        userEditShowInfoIsLoading,
        setUserEditShowInfoIsLoading,
        userEditShowInfoData,
        setUserEditShowInfoData,
        userEditShowInfoError,
        setUserEditShowInfoError,
        userEditSubmitInfoIsLoading,
        setUserEditSubmitInfoIsLoading,
        userEditSubmitInfoMessage,
        setUserEditSubmitInfoMessage,
        userEditSubmitInfoError,
        setUserEditSubmitInfoError,

        // Perfil de usuario
        userViewIsLoading,
        setUserViewIsLoading,
        userViewData,
        setUserViewData,
        userViewError,
        setUserViewError,
        deleteWarningModalShow,
        setDeleteWarningModalShow,
        newUserData,
        setNewUserData,
        userEditSubmitInfoData,
        setUserEditSubmitInfoData,
        userDeleteIsLoading,
        setUserDeleteIsLoading,
        userDeleteError,
        setUserDeleteError,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
}
