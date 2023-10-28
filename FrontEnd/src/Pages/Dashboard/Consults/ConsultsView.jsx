import React, { useContext, useEffect } from "react";
import { ConsultContext } from "../../../Context/ConsultsContext";
import { AppContext } from "../../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Components/Utils/Loading";
import Error from "../../../Components/Utils/Error";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { getConsultsById } from "../../../Services/consults.service";

// Datos de la consulta
function ConsultsView() {
  const navigate = useNavigate(); // Para redirigir la URL
  const idConsult = useParams().idConsult; // Obtener el ID de la URL
  const { user } = useContext(AppContext); // Obtener el rol del usuario

  const {
    consultsViewIsLoading,
    setConsultsViewIsLoading,
    consultsViewData,
    setConsultsViewData,
    consultViewError,
    setConsultsViewError,
  } = useContext(ConsultContext);

  useEffect(() => {
    if (consultsViewIsLoading) {
      getConsultsById(idConsult)
        .then((res) => {
          // Si la petición se ha ejecutado correctamente.
          if (res.status === 200) {
            setConsultsViewData(res.data); // Guardar datos.
            if (res.data.error) {
              setConsultsViewError(res.data.error); // Guardar error.
            }
          } else {
            setConsultsViewError("Hubo un error al mostrar los datos del usuario."); // Guardar error.
          }

          setConsultsViewIsLoading(false);
        })
        .catch((err) => {
          setConsultsViewError("Hubo un error al realizar la solicitud."); // Almacenar error
          setConsultsViewIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultsViewIsLoading]);

  // Si está cargando
  if (consultsViewIsLoading) {
    return <Loading />;
  }

  // Si hay errores
 if (consultViewError) {
    return (
      <Error
        error={consultViewError}
        actions={() => {
          navigate("/dashboard/consults/" + idConsult);
        }}
      />
    );
  }

  // Si no está cargando ni hay errores
  return (
    <Stack>
      <Container className="fs-5">
        <Row>
          <Col xs={3}>ID:</Col>
          <Col>{consultsViewData.idConsulta}</Col>
        </Row>
        <Row>
          <Col xs={3}>Mascota:</Col>
          <Col>{consultsViewData.nombreMascota}</Col>
        </Row>
        <Row>
          <Col xs={3}>Fecha:</Col>
          <Col>{new Date(consultsViewData.fecha).toLocaleDateString()}</Col>
        </Row>
        <Row>
          <Col xs={3}>Hora:</Col>
          <Col>{consultsViewData.hora.substr(0, 5)}</Col>
        </Row>
        <Row>
          <Col xs={3}>Diagnóstico:</Col>
          <Col>{consultsViewData.diagnostico}</Col>
        </Row>
        <Row>
          <Col xs={3}>Tratamiento:</Col>
          <Col>{consultsViewData.tratamiento}</Col>
        </Row>
        <Row>
          <Col xs={3}>Observaciones:</Col>
          <Col>{consultsViewData.observaciones}</Col>
        </Row>
      </Container>
      {user.rol ? (
        <div className="ms-auto">
          <Button
            onClick={() => {
              navigate("/dashboard/consults/" + idConsult + "/edit");
            }}
          >
            Editar
          </Button>
        </div>
      ) : null}
    </Stack>
  );
}

export default ConsultsView;
