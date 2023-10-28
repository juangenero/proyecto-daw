import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { VaccineContext } from "../../../Context/VaccineContext";
import { getVaccine } from "../../../Services/vaccines.service";
import Error from "../../../Components/Utils/Error";
import Loading from "../../../Components/Utils/Loading";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";

function VaccineView() {
  const navigate = useNavigate(); // Para redirigir la URL
  const idVaccine = useParams().idVaccine; // Obtener el ID de la URL

  const {
    vaccineViewIsLoading,
    setVaccineViewIsLoading,
    vaccineViewData,
    setVaccineViewData,
    vaccineViewError,
    setVaccineViewError,
  } = useContext(VaccineContext);

  useEffect(() => {
    if (vaccineViewIsLoading) {
      getVaccine(idVaccine)
        .then((res) => {
          // Si la petición se ha ejecutado correctamente.
          if (res.status === 200) {
            setVaccineViewData(res.data); // Guardar datos.
            if (res.data.error) {
              setVaccineViewError(res.data.error); // Guardar error.
            }
          } else {
            setVaccineViewError("Hubo un error al mostrar los datos del usuario."); // Guardar error.
          }

          setVaccineViewIsLoading(false);
        })
        .catch((err) => {
          setVaccineViewError("Hubo un error al realizar la solicitud."); // Almacenar error
          setVaccineViewIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccineViewIsLoading]);

  // Si está cargando
  if (vaccineViewIsLoading) {
    return <Loading />;
  }

  // Si hay errores
  if (vaccineViewError) {
    return (
      <Error
        error={vaccineViewError}
        actions={() => {
          navigate("/dashboard/vaccines/" + idVaccine);
        }}
      />
    );
  }

  // Si no está cargando ni hay erroes
  return (
    <Stack>
      <Container className="fs-5">
        <Row>
          <Col xs={3}>ID:</Col>
          <Col>{vaccineViewData.idVacuna}</Col>
        </Row>
        <Row>
          <Col xs={3}>Nombre:</Col>
          <Col>{vaccineViewData.vacuna}</Col>
        </Row>
        <Row>
          <Col xs={3}>Observaciones:</Col>
          <Col>{vaccineViewData.observaciones}</Col>
        </Row>
      </Container>
      <div className="ms-auto">
        <Button
          onClick={() => {
            navigate("/dashboard/vaccines/" + idVaccine + "/edit");
          }}
        >
          Editar
        </Button>
      </div>
    </Stack>
  );
}

export default VaccineView;
