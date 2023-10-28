import React, { useEffect } from "react";
import { useContext } from "react";
import { getAllVaccines } from "../../../Services/vaccines.service.js";
import { VaccineContext } from "../../../Context/VaccineContext";
import { Table, Button, OverlayTrigger, Alert } from "react-bootstrap";
import { Eye, Pencil, Trash } from "../../../Components/Utils/Icons";
import Loading from "../../../Components/Utils/Loading";
import Error from "../../../Components/Utils/Error";
import { useNavigate } from "react-router-dom";
import { viewToolTip, editToolTip, deleteToolTip } from "../../../Components/Utils/ToolTips";
import DeleteVaccineModal from "../../../Pages/Dashboard/Vaccines/Modals/DeleteVaccineModal";
import NewVaccineModal from "./Modals/NewVaccineModal.jsx";

function VaccinesList() {
  const navigate = useNavigate();
  const {
    vaccineListIsLoading,
    setVaccineListIsLoading,
    vaccineListData,
    setVaccineListData,
    vaccineListError,
    setVaccineListError,
    setVaccineDeleteModal, // Mostrar modal de eliminar vacuna
    setSelectedVaccine, // Pasar datos al modal de eliminar vacuna
    setNewVaccineModal, // Mostrar modal para crear vacuna
  } = useContext(VaccineContext);

  useEffect(() => {
    if (vaccineListIsLoading) {
      getAllVaccines()
        .then((res) => {
          if (res.status === 200) {
            setVaccineListData(res.data);
          } else {
            setVaccineListError("Hubo un error al procesar la solicitud");
          }

          setVaccineListIsLoading(false);
        })
        .catch((err) => {
          setVaccineListError("Hubo un error al realizar la solicitud."); // Guardar error
          setVaccineListIsLoading(false); // Cambiar estado, ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccineListIsLoading]);

  if (vaccineListIsLoading) {
    return <Loading />;
  }

  if (vaccineListError) {
    return (
      <Error
        error={vaccineListError}
        actions={() => {
          navigate("/dashboard/vaccines");
        }}
      />
    );
  }

  return (
    <>
      <Button
        onClick={() => {
          setNewVaccineModal(true);
        }}
        className="mb-2"
      >
        Nueva vacuna
      </Button>
      {vaccineListData.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Observaciones</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vaccineListData.map((vaccine) => (
              <tr key={vaccine.idVacuna}>
                <td>{vaccine.idVacuna}</td>
                <td>{vaccine.vacuna}</td>
                <td>{vaccine.observaciones}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 50, hide: 150 }}
                    overlay={viewToolTip}
                  >
                    <span>
                      <Eye
                        action={() => {
                          navigate("/dashboard/vaccines/" + vaccine.idVacuna); // Redirige a la página de vista de vacuna.
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
                          navigate("/dashboard/vaccines/" + vaccine.idVacuna + "/edit"); // Redirige a la página de edición de vacuna.
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
                          setVaccineDeleteModal(true);
                          setSelectedVaccine({ id: vaccine.idVacuna, nombre: vaccine.vacuna });
                        }}
                      />
                    </span>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className="d-flex align-items-center">
          <Alert className="w-25 mx-auto text-center" variant="primary">
            No hay vacunas para mostrar
          </Alert>
        </div>
      )}

      <NewVaccineModal />
      <DeleteVaccineModal />
    </>
  );
}

export default VaccinesList;
