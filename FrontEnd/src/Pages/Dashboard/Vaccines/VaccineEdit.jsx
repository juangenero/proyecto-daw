import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Button, Col, Container, Row, Form, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../../Components/Utils/Error";
import Loading from "../../../Components/Utils/Loading";
import { VaccineContext } from "../../../Context/VaccineContext";
import { editVaccine, getVaccine } from "../../../Services/vaccines.service";

function VaccineEdit() {
  const idVaccine = useParams().idVaccine; // Coge el ID de la URL
  const [payLoad, setPayLoad] = useState(null); // Estado local
  const navigate = useNavigate();

  const {
    // 1º llamada a la API (mostrar datos)
    vaccineEditShowInfoIsLoading,
    setVaccineEditShowInfoIsLoading,
    vaccineEditShowInfoData,
    setVaccineEditShowInfoData,
    vaccineEditShowInfoError,
    setVaccineEditShowInfoError,

    // 2º llamada a la API (enviar datos)
    vaccineEditSubmitInfoIsLoading,
    setVaccineEditSubmitInfoIsLoading,
    vaccineEditSubmitInfoMessage,
    setVaccineEditSubmitInfoMessage,
    vaccineEditSubmitInfoError,
    setVaccineEditSubmitInfoError,
  } = useContext(VaccineContext);

  // 1º llamada a la API (mostrar datos)
  useEffect(() => {
    if (vaccineEditShowInfoIsLoading) {
      getVaccine(idVaccine)
        .then((res) => {
          // Si la petición se ha ejecutado correctamente.
          if (res.status === 200) {
            setVaccineEditShowInfoData(res.data); // Guardar datos.
            if (res.data.error) {
              setVaccineEditShowInfoError(res.data.error); // Guardar error.
            }
          } else {
            setVaccineEditShowInfoError("Hubo un error al mostrar los datos de la vacuna."); // Guardar error.
          }

          setVaccineEditShowInfoIsLoading(false);
        })
        .catch((err) => {
          setVaccineEditShowInfoError("Hubo un error al realizar la solicitud."); // Almacenar error
          setVaccineEditShowInfoIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccineEditShowInfoIsLoading]);

  // 2º llamada a la API (editar datos)
  useEffect(() => {
    if (vaccineEditSubmitInfoIsLoading) {
      editVaccine(payLoad)
        .then((res) => {
          // Si todo a ido bien
          if (res.status === 200) {
            // Si existe algún error
            if (res.data.error) {
              setVaccineEditSubmitInfoError(res.data.error);
              // Si no existe error
            } else {
              setVaccineEditSubmitInfoMessage("Vacuna editada.");
            }
            // Si algo a ido mal
          } else {
            setVaccineEditSubmitInfoError("Hubo un error al mostrar los datos de la vacuna.");
          }

          setVaccineEditSubmitInfoIsLoading(false);
        })
        .catch((err) => {
          setVaccineEditSubmitInfoError("Hubo un error al realizar la solicitud."); // Almacenar error
          setVaccineEditSubmitInfoIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccineEditSubmitInfoIsLoading]);

  if (vaccineEditShowInfoIsLoading) {
    return <Loading />;
  }

  if (vaccineEditShowInfoError) {
    return (
      <Error
        error={vaccineEditShowInfoError}
        actions={() => {
          navigate("/dashboard/vaccines/" + idVaccine + "/edit");
        }}
      />
    );
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      {/** Mensaje de error */}
      {vaccineEditSubmitInfoError ? (
        <Alert variant="danger w-50">
          <h6 className="mb-0">{vaccineEditSubmitInfoError}</h6>
        </Alert>
      ) : null}
      {/** Resultado de la edición */}
      {vaccineEditSubmitInfoMessage ? (
        <Alert variant="success w-25">
          <h6 className="mb-0">{vaccineEditSubmitInfoMessage}</h6>
        </Alert>
      ) : null}
      <Container>
        <p>Los campos marcados con (*) son obligatorios.</p>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" defaultValue={vaccineEditShowInfoData.idVacuna} disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                defaultValue={vaccineEditShowInfoData.vacuna}
                minLength={3}
                maxLength={50}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="observaciones">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                defaultValue={vaccineEditShowInfoData.observaciones}
                maxLength={250}
              />
            </Form.Group>
          </Col>
        </Row>

        {vaccineEditSubmitInfoIsLoading ? (
          <Button type="submit" variant="success" className="mx-1 mt-2">
            <Spinner animation="grow" size="sm" />
            Editar
          </Button>
        ) : (
          <Button type="submit" variant="success" className="mx-1 mt-2">
            Editar
          </Button>
        )}

        <Button
          variant="danger"
          className="mx-1 mt-2"
          onClick={() => {
            navigate("/dashboard/vaccines");
          }}
        >
          Cancelar
        </Button>
      </Container>
    </Form>
  );

  function handleSubmit(event) {
    event.preventDefault();

    // Construir JSON para enviarlo al servidor
    setPayLoad({
      id: event.target.id.value,
      nombre: event.target.nombre.value,
      observaciones: event.target.observaciones.value,
    });

    setVaccineEditSubmitInfoMessage(null);
    setVaccineEditSubmitInfoError(null);
    setVaccineEditSubmitInfoIsLoading(true);
  }
}

export default VaccineEdit;
