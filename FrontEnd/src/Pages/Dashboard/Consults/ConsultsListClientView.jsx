import React, { useContext, useEffect } from "react";
import { AppContext } from "../../../Context/AppContext";
import { Alert, OverlayTrigger, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Error from "../../../Components/Utils/Error";
import { Eye } from "../../../Components/Utils/Icons";
import Loading from "../../../Components/Utils/Loading";
import { viewToolTip } from "../../../Components/Utils/ToolTips";
import { ConsultContext } from "../../../Context/ConsultsContext";
import { getConsultsPetsOfUserId } from "../../../Services/consults.service";

// Listado de consultas (para clientes)
function ConsultsListVetView() {
  const navigate = useNavigate();
  const { user } = useContext(AppContext); // Contexto del login

  const {
    consultsListIsLoading,
    setConsultsListIsLoading,
    consultsListData,
    setConsultsListData,
    consultListError,
    setConsultsListError,
  } = useContext(ConsultContext);

  useEffect(() => {
    if (consultsListIsLoading) {
      getConsultsPetsOfUserId(user.id)
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
          setConsultsListIsLoading(false); // Cambiar estado, ocurrió un error
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
      {console.log(consultsListData)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ConsultsListVetView;
