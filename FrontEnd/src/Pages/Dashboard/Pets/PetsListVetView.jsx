import { useEffect, useContext } from "react";
import { Alert, Button, OverlayTrigger, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Error from "../../../Components/Utils/Error";
import { Eye, Pencil, Trash } from "../../../Components/Utils/Icons";
import Loading from "../../../Components/Utils/Loading";
import { deleteToolTip, editToolTip, viewToolTip } from "../../../Components/Utils/ToolTips";
import { PetsContext } from "../../../Context/PetsContext";
import { getAllPets } from "../../../Services/pets.service";
import DeletePetModal from "./Modals/DeletePetModal";
import NewPetModal from "./Modals/NewPetModal";

export default function PetsListVetView() {
  const navigate = useNavigate();

  const {
    petsListIsLoading,
    setPetsListIsLoading,
    petsListData,
    setPetsListData,
    petsListError,
    setPetsListError,
    setNewPetModal,
    setSelectedPet,
    setPetDeleteModalShow,
  } = useContext(PetsContext);

  useEffect(() => {
    if (petsListIsLoading) {
      getAllPets()
        .then((res) => {
          if (res.status === 200) {
            setPetsListData(res.data);
          } else {
            setPetsListError("Hubo un error al procesar la solicitud");
          }

          setPetsListIsLoading(false);
        })
        .catch((err) => {
          setPetsListError("Hubo un error al realizar la solicitud."); // Guardar error
          setPetsListIsLoading(false); // Cambiar estado, ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petsListIsLoading]);

  // Si está cargando
  if (petsListIsLoading) {
    return <Loading />;
  }

  // Si hay errores
  if (petsListError) {
    return (
      <Error
        error={petsListError}
        actions={() => {
          navigate("/dashboard/pets");
        }}
      />
    );
  }

  // Si no está cargando ni hay errores
  return (
    <>
      <Button
        className="mb-2"
        onClick={() => {
          setNewPetModal(true);
        }}
      >
        Nueva mascota
      </Button>

      {petsListData.length === 0 ? (
        <div className="d-flex justify-content-center">
          <Alert className="w-25 text-center">Aún no hay mascotas registradas.</Alert>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Propietario</th>
              <th>Raza</th>
              <th>Especie</th>
              <th>Última consulta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {petsListData.map((pet) => (
              <tr key={pet.idMascota}>
                <td>{pet.idMascota}</td>
                <td>{pet.nombre}</td>
                <td>{pet.dueno}</td>
                <td>{pet.raza ? pet.raza : "-"}</td>
                <td>{pet.especie}</td>
                <td>
                  {pet.ultimaConsulta ? new Date(pet.ultimaConsulta).toLocaleDateString() : "-"}
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 50, hide: 150 }}
                    overlay={viewToolTip}
                  >
                    <span>
                      <Eye
                        action={() => {
                          navigate("/dashboard/pets/" + pet.idMascota); // Redirige a la página de vista de mascotas.
                        }}
                      />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 50, hide: 150 }}
                    overlay={editToolTip}
                  >
                    <span>
                      <Pencil
                        action={() => {
                          navigate("/dashboard/pets/" + pet.idMascota + "/edit"); // Redirige a la página de edición de mascotas.
                        }}
                      />
                    </span>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 50, hide: 150 }}
                    overlay={deleteToolTip}
                  >
                    <span>
                      <Trash
                        action={() => {
                          setPetDeleteModalShow(true);
                          setSelectedPet({ nombre: pet.nombre, idMascota: pet.idMascota });
                        }}
                      />
                    </span>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <DeletePetModal/>
      <NewPetModal />
    </>
  );
}
