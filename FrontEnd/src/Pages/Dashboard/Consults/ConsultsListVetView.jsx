import React, { useContext, useEffect } from "react";
import { Alert, Button, OverlayTrigger, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Error from "../../../Components/Utils/Error";
import { Eye, Pencil, Trash } from "../../../Components/Utils/Icons";
import Loading from "../../../Components/Utils/Loading";
import { deleteToolTip, editToolTip, viewToolTip } from "../../../Components/Utils/ToolTips";
import { ConsultContext } from "../../../Context/ConsultsContext";
import { getConsults } from "../../../Services/consults.service";
import DeleteConsultModal from "./Modals/DeleteConsultModal";
import NewConsultModal from "./Modals/NewConsultModal";

// Listado de consultas (para veterinarios)
function ConsultsListVetView() {
  const navigate = useNavigate();

  const {
    consultsListIsLoading,
    setConsultsListIsLoading,
    consultsListData,
    setConsultsListData,
    consultListError,
    setConsultsListError,
    setNewConsultModal,
  } = useContext(ConsultContext);

  const { setConsultDeleteModalShow, setSelectedConsult } = useContext(ConsultContext);

  useEffect(() => {
    if (consultsListIsLoading) {
      getConsults()
        .then((res) => {
          if (res.status === 200) {
            setConsultsListData(res.data);
          } else {
            setConsultsListError("Hubo un error al procesar la solicitud");
          }

          setConsultsListIsLoading(false);
        })
        .catch((err) => {
          setConsultsListError("Hubo un error al realizar la solicitud."); // Guardar error
          setConsultsListIsLoading(false); // Cambiar estado, ocurrió un error inesperado
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultsListIsLoading]);

  // Si está cargando
  if (consultsListIsLoading) {
    return <Loading />;
  }

  // Si hay errores
  if (consultListError) {
    return (
      <Error
        error={consultListError}
        actions={() => {
          navigate("/dashboard/pets");
        }}
      />
    );
  }

  return (
    <>
      <Button
        className="mb-2"
        onClick={() => {
          setNewConsultModal(true);
        }}
      >
        Nueva consulta
      </Button>
      {consultsListData.length === 0 ? (
        <div className="d-flex justify-content-center">
          <Alert className="w-25 text-center">No existen consultas.</Alert>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID Consulta</th>
              <th>Mascota</th>
              <th>Propietario</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {consultsListData.map((consult) => (
              <tr key={consult.idConsulta}>
                <td>{consult.idConsulta}</td>
                <td>{consult.nombreMascota}</td>
                <td>{consult.nombrePropietario + " " + consult.apellidosPropietario}</td>
                <td>{consult.fecha ? new Date(consult.fecha).toLocaleDateString() : "-"}</td>
                <td>{consult.hora.substring(0, 5)}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 50, hide: 150 }}
                    overlay={viewToolTip}
                  >
                    <span>
                      <Eye
                        action={() => {
                          navigate("/dashboard/consults/" + consult.idConsulta); // Redirige a la página de vista de consultas.
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
                          navigate("/dashboard/consults/" + consult.idConsulta + "/edit"); // Redirige a la página de edición de mascotas.
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
                          setConsultDeleteModalShow(true);
                          setSelectedConsult({
                            idConsulta: consult.idConsulta,
                            nombreMascota: consult.nombreMascota,
                            fecha: new Date(consult.fecha).toLocaleDateString(),
                            hora: consult.hora.substring(0, 5),
                          });
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

      {/* Modals (Iniciados en oculto) */}
      <NewConsultModal />
      <DeleteConsultModal />
    </>
  );
}

export default ConsultsListVetView;
