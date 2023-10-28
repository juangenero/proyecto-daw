import { useEffect, useContext } from "react";

// Componentes para las rutas
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Contenido de las rutas
import { AppContext } from "../Context/AppContext";
import { UserContext } from "../Context/UserContext";
import { PetsContext } from "../Context/PetsContext";
import { VaccineContext } from "../Context/VaccineContext";
import { ConsultContext } from "../Context/ConsultsContext";

// Usuarios
import UsersList from "../Pages/Dashboard/Users/UsersList";
import UserView from "../Pages/Dashboard/Users/UserView";
import UserEdit from "../Pages/Dashboard/Users/UserEdit";

// Mascotas
import PetsListVetView from "../Pages/Dashboard/Pets/PetsListVetView";
import PetsListClientView from "../Pages/Dashboard/Pets/PetsListClientView";
import PetsView from "../Pages/Dashboard/Pets/PetsView";
import PetsEdit from "../Pages/Dashboard/Pets/PetsEdit";

// Consultas
import ConsultsListVetView from "../Pages/Dashboard/Consults/ConsultsListVetView";
import ConsultsListClientView from "../Pages/Dashboard/Consults/ConsultsListClientView";
import ConsultsView from "../Pages/Dashboard/Consults/ConsultsView";
import ConsultEdit from "../Pages/Dashboard/Consults/ConsultEdit";

// Vacunas
import VaccinesList from "../Pages/Dashboard/Vaccines/VaccinesList";
import VaccineView from "../Pages/Dashboard/Vaccines/VaccineView";
import VaccineEdit from "../Pages/Dashboard/Vaccines/VaccineEdit";
import Help from "../Pages/Dashboard/Help/Help";

/**
 * Esta sección indica que componente se va a renderizar cuando se visite X ruta dentro de "dashboard"
 *
 * Las rutas "profile", "users" y "vaccines" sólo renderizarán el componente si el rol tiene permisos
 * para visualizarlo.
 *
 * Las rutas "pets" y "consults" son comunes a los 2 roles, renderizan el mismo componente, aunque
 * dependiendo del rol, mostrará unos datos u otros.
 */

function DashboardRoutes() {
  const location = useLocation(); // Hook de react-router-dom

  // LOGIN
  const { user } = useContext(AppContext);

  // USUARIOS
  const {
    // Listado usuarios
    setUserListIsLoading,
    setUserListData,
    setUserListError,

    // Perfil usuarios
    setUserViewIsLoading,
    setUserViewData,
    setUserViewError,
    
    // Edición usuarios
    setUserEditShowInfoIsLoading,
    setUserEditShowInfoData,
    setUserEditShowInfoError,
    setUserEditSubmitInfoIsLoading,
    setUserEditSubmitInfoData,
    setUserEditSubmitInfoMessage,
    setUserEditSubmitInfoError,
  } = useContext(UserContext);

  // MASCOTAS
  const {
    // Listado de mascotas
    setPetsListIsLoading,
    setPetsListData,
    setPetsViewData,
    setPetsViewError,
    setPetsListError,
    setPetsViewIsLoading,
    setPetsConsultSelected,

    // Edición de mascotas
    setPetEditIsLoading,
    setPetEditData,
    setPetEditMessage,
    setPetEditError,
  } = useContext(PetsContext);

  // CONSULTAS
  const {
    // Listado de consultas
    setConsultsListIsLoading,
    setConsultsListData,
    setConsultsListError,

    // Vista de consultas
    setConsultsViewIsLoading,
    setConsultsViewData,
    setConsultsViewError,

    // Editar consultas
    setConsultEditShowInfoIsLoading,
    setConsultEditShowInfoData,
    setConsultEditShowInfoError,
    setConsultEditSubmitInfoIsLoading,
    setConsultEditSubmitInfoMessage,
    setConsultEditSubmitInfoError,
  } = useContext(ConsultContext);

  // VACUNAS
  const {
    // Listado de vacunas
    setVaccineListIsLoading,
    setVaccineListData,
    setVaccineListError,

    // Vista de vacunas
    setVaccineViewIsLoading,
    setVaccineViewData,
    setVaccineViewError,

    // Edición de vacunas
    setVaccineEditShowInfoIsLoading,
    setVaccineEditShowInfoData,
    setVaccineEditShowInfoError,
    setVaccineEditSubmitInfoIsLoading,
    setVaccineEditSubmitInfoMessage,
    setVaccineEditSubmitInfoError,
  } = useContext(VaccineContext);

  // Hook para limpiar estados de todo el dashboard cuando se cambia de ruta (Los estados de los modals se eliminan al ocultarse, implementado en cada modal)
  useEffect(() => {
    const currentRoute = location.pathname; // Ruta actual
    // - - - USUARIOS - - -

    // Listado de usuarios
    if (currentRoute === "/dashboard/users") {
      setUserListIsLoading(true);
      setUserListData(null);
      setUserListError(null);
    }

    // Perfil de usuario
    else if (
      currentRoute.match("/dashboard/users/[0-9]{1,9}$") ||
      currentRoute === "/dashboard/profile"
    ) {
      setUserViewIsLoading(true);
      setUserViewData(null);
      setUserViewError(null);
    }

    // Edición de usuarios
    else if (
      currentRoute.match("/dashboard/users/[0-9]{1,9}/edit$") ||
      currentRoute === "/dashboard/profile/edit"
    ) {
      setUserEditShowInfoIsLoading(true);
      setUserEditShowInfoData(null);
      setUserEditShowInfoError(null);
      setUserEditSubmitInfoIsLoading(false);
      setUserEditSubmitInfoData(null);
      setUserEditSubmitInfoMessage(null);
      setUserEditSubmitInfoError(null);
    }

    // - - - MASCOTAS - - -

    // Listado de mascotas
    else if (currentRoute === "/dashboard/pets") {
      setPetsListIsLoading(true);
      setPetsListData(null);
      setPetsListError(null);
    }

    // Perfil de mascota
    else if (currentRoute.match("/dashboard/pets/[0-9]{1,9}$")) {
      setPetsViewIsLoading(true);
      setPetsViewData(null);
      setPetsViewError(null);
      setVaccineListData(null);
      setConsultsListData(null);
      setPetsConsultSelected(null);
    }

    // Edición de mascotas
    else if (currentRoute.match("/dashboard/pets/[0-9]{1,9}/edit$")) {
      setPetsViewIsLoading(true);
      setPetsViewData(null);
      setPetsViewError(null);
      setPetEditIsLoading(false);
      setPetEditData(null);
      setPetEditMessage(null);
      setPetEditError(null);
    }

    // - - - CONSULTAS - - -

    // Listado de consultas
    else if (currentRoute === "/dashboard/consults") {
      setConsultsListIsLoading(true);
      setConsultsListData(null);
      setConsultsListError(null);
    }

    // Vista de consultas
    else if (currentRoute.match("/dashboard/consults/[0-9]{1,9}$")) {
      setConsultsViewIsLoading(true);
      setConsultsViewData(null);
      setConsultsViewError(null);
    }

    // Edición de consultas
    else if (currentRoute.match("/dashboard/consults/[0-9]{1,9}/edit$")) {
      setConsultEditShowInfoIsLoading(true);
      setConsultEditShowInfoData(null);
      setConsultEditShowInfoError(null);
      setConsultEditSubmitInfoIsLoading(false);
      setConsultEditSubmitInfoMessage(null);
      setConsultEditSubmitInfoError(null);
    }

    // - - - VACUNAS - - -

    // Listado de vacunas
    else if (currentRoute === "/dashboard/vaccines") {
      setVaccineListIsLoading(true);
      setVaccineListData(null);
      setVaccineListError(null);
    }

    // Vista de vacuna
    else if (currentRoute.match("/dashboard/vaccines/[0-9]{1,9}$")) {
      setVaccineViewIsLoading(true);
      setVaccineViewData(null);
      setVaccineViewError(null);
    }

    // Edición de vacunas
    else if (currentRoute.match("/dashboard/vaccines/[0-9]{1,9}/edit$")) {
      setVaccineEditShowInfoIsLoading(true);
      setVaccineEditShowInfoData(null);
      setVaccineEditShowInfoError(null);
      setVaccineEditSubmitInfoIsLoading(false);
      setVaccineEditSubmitInfoMessage(null);
      setVaccineEditSubmitInfoError(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <Routes>
      {/** GESTIONAR PERFIL */}

      {user.rol ? null : (
        <Route path="/profile" element={<UserView renderingMode="client" />} />
      )}

      {user.rol ? null : (
        <Route
          path="/profile/edit"
          element={<UserEdit renderingMode="client" />}
        />
      )}

      {/** ADMINISTRAR USUARIOS */}

      {user.rol ? (
        <>
          <Route path="/users" element={<UsersList />} />

          <Route
            path="/users/:idUser"
            element={<UserView renderingMode="vet" />}
          />

          <Route
            path="/users/:idUser/edit"
            element={<UserEdit renderingMode="vet" />}
          />
        </>
      ) : null}

      {/** ADMINISTRAR MASCOTAS */}

      <Route
        path="/pets"
        element={user.rol ? <PetsListVetView /> : <PetsListClientView />}
      />

      <Route path="/pets/:idPet" element={<PetsView />} />

      <Route path="/pets/:idPet/edit" element={<PetsEdit />} />

      {/** ADMINISTRAR CONSULTAS */}

      <Route
        path="/consults"
        element={
          user.rol ? <ConsultsListVetView /> : <ConsultsListClientView />
        }
      />

      <Route path="/consults/:idConsult" element={<ConsultsView />} />

      {user.rol ? (
        <Route path="/consults/:idConsult/edit" element={<ConsultEdit />} />
      ) : null}

      {/** ADMINISTRAR VACUNAS */}

      {user.rol ? <Route path="/vaccines" element={<VaccinesList />} /> : null}

      {user.rol ? (
        <Route path="/vaccines/:idVaccine" element={<VaccineView />} />
      ) : null}

      {user.rol ? (
        <Route path="/vaccines/:idVaccine/edit" element={<VaccineEdit />} />
      ) : null}

      {/** Sección de Ayuda */}
      <Route path="/help" element={<Help />} />

      {/** El resto de rutas no existentes que cuelguen de dashboard, redireccionará a mascotas */}
      <Route path="*" element={<Navigate replace to="/dashboard/pets" />} />
    </Routes>
  );
}

export default DashboardRoutes;
