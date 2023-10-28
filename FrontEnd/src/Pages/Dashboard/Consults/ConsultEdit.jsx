import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../../Components/Utils/Error";
import Loading from "../../../Components/Utils/Loading";
import { ConsultContext } from "../../../Context/ConsultsContext";
import {
  editConsult,
  getConsultsById,
} from "../../../Services/consults.service";
import axios from "axios";
import { getVetUsernames } from "../../../Services/users.service";
import { getPetsNames } from "../../../Services/pets.service";

// Página para editar las consultas
function ConsultEdit() {
  const idConsult = useParams().idConsult; // Coge el ID de la URL
  const [payLoad, setPayLoad] = useState(null); // Estado local
  const navigate = useNavigate(); // Hook para poder redirigir

  const {
    // 1º llamada a la API (mostrar datos)
    consultEditShowInfoIsLoading,
    setConsultEditShowInfoIsLoading,
    consultEditShowInfoData,
    setConsultEditShowInfoData,
    consultEditShowInfoError,
    setConsultEditShowInfoError,

    // 2º llamada a la API (enviar datos)
    consultEditSubmitInfoIsLoading,
    setConsultEditSubmitInfoIsLoading,
    consultEditSubmitInfoMessage,
    setConsultEditSubmitInfoMessage,
    consultEditSubmitInfoError,
    setConsultEditSubmitInfoError,
  } = useContext(ConsultContext);

  // Estados locales para los desplegables de mascotas y usuarios
  const [vetsData, setVetsData] = useState(null);
  const [petsData, setPetsData] = useState(null);

  // 1º llamada (múltiple) a la API, se realiza cuando se carga la página para mostrar los datos en el formulario
  useEffect(() => {
    if (consultEditShowInfoIsLoading) {
      // Llamada a la API múltiple
      axios
        .all([getVetUsernames(), getPetsNames(), getConsultsById(idConsult)])
        .then(({ ...res }) => {
          // 1º respuesta de la API (datos veterinarios)
          if (res[0].status === 200) {
            if (!res[0].data.error)
              setVetsData(res[0].data); // Si la API no devuelve errores
            else setConsultEditShowInfoError(res[0].data.error); // Si la API devuelve errores
          }

          // 2º respuesta de la API (datos mascota)
          if (res[1].status === 200) {
            if (!res[1].data.error)
              setPetsData(res[1].data); // Si la API no devuelve errores
            else setConsultEditShowInfoError(res[1].data.error); // Si la API devuelve errores
          }

          // 3º respuesta de la API (datos de la consulta)
          // Si la respuesta es correcta
          if (res[2].status === 200) {
            setConsultEditShowInfoData(res[2].data); // Guardar datos.

            // Si ha devuelto algún error
            if (res[2].data.error) {
              setConsultEditShowInfoError(res[2].data.error); // Guardar error.
            }

            // Si la respuesta no es correcta
          } else {
            setConsultEditShowInfoError(
              "Hubo un error al mostrar los datos de la vacuna."
            ); // Guardar error.
          }

          setConsultEditShowInfoIsLoading(false);
        })
        // Si alguna de las 3 solicitudes a la API devuelve una promesa en estado "rechazada"
        .catch((...err) => {
          setConsultEditShowInfoError(
            "Hubo un error al realizar la solicitud."
          );
          setConsultEditShowInfoIsLoading(false); // Cambiar estado, ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultEditShowInfoIsLoading]);

  // 2º llamada a la API (editar datos)
  useEffect(() => {
    if (consultEditSubmitInfoIsLoading) {
      editConsult(payLoad)
        .then((res) => {
          // Si todo a ido bien
          if (res.status === 200) {
            // Si existe algún error
            if (res.data.error) {
              setConsultEditSubmitInfoError(res.data.error);
              // Si no existe error
            } else {
              setConsultEditSubmitInfoMessage("Consulta editada.");
            }
            // Si algo a ido mal
          } else {
            setConsultEditSubmitInfoError(
              "Hubo un error al editar los datos de la consulta."
            );
          }

          setConsultEditSubmitInfoIsLoading(false);
        })
        .catch((err) => {
          setConsultEditSubmitInfoError(
            "Hubo un error al realizar la solicitud."
          ); // Almacenar error
          setConsultEditSubmitInfoIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultEditSubmitInfoIsLoading]);

  if (consultEditShowInfoIsLoading) {
    return <Loading />;
  }

  if (consultEditShowInfoError) {
    return (
      <Error
        error={consultEditShowInfoError}
        actions={() => {
          navigate("/dashboard/consults/" + idConsult + "/edit");
        }}
      />
    );
  }

  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      {/** Mensaje de error de la edición */}
      {consultEditSubmitInfoError ? (
        <Alert variant="danger w-50">
          <h6 className="mb-0">{consultEditSubmitInfoError}</h6>
        </Alert>
      ) : null}

      {/** Resultado de la edición */}
      {consultEditSubmitInfoMessage ? (
        <Alert variant="success w-25">
          <h6 className="mb-0">{consultEditSubmitInfoMessage}</h6>
        </Alert>
      ) : null}

      <Container>
        <p>Los campos marcados con (*) son obligatorios.</p>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="idConsulta">
              <Form.Label>ID consulta</Form.Label>
              <Form.Control type="text" defaultValue={idConsult} disabled />
            </Form.Group>
          </Col>
          <Col>
            {/* Recorrer JSON de usuarios (veterinarios) */}
            <Form.Group className="mb-3" controlId="idUsuario">
              <Form.Label>Atendido por</Form.Label>
              <Form.Select>
                {/* Si existen los datos y no hay errores */}
                {vetsData && !consultEditShowInfoError ? (
                  // Recorre el JSON
                  vetsData.map((vet) => (
                    // Mostrando una opción por cada usuario veterinario
                    <option
                      value={vet.idUsuario}
                      key={vet.idUsuario}
                      defaultValue={
                        // Si el veterinario que se está mostrando en el bucle tiene el mismo ID que el que atendió la consulta, lo muestra seleccionado.
                        consultEditShowInfoData.idUsuario === vet.idUsuario
                          ? true
                          : false
                      }
                    >
                      {vet.nombre + " " + vet.apellidos}
                    </option>
                  ))
                ) : (
                  // Si no se pudieron obtener los datos
                  <option value={null} disabled>
                    Error al obtener el listado
                  </option>
                )}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            {/* Recorrer JSON de mascotas */}
            <Form.Group className="mb-3" controlId="idMascota">
              <Form.Label>Mascota</Form.Label>
              <Form.Select>
                {/* Si existen los datos y no hay errores */}
                {petsData && !consultEditShowInfoError ? (
                  // Recorre el JSON
                  petsData.map((pet) => (
                    // Mostrando una opción por cada usuario veterinario
                    <option
                      value={pet.idMascota}
                      key={pet.idMascota}
                      defaultValue={
                        // Si la mascota que se está mostrando en el bucle tiene el mismo ID que la que ha asistido a la consulta, lo muestra seleccionado.
                        consultEditShowInfoData.idMascota === pet.idMascota
                          ? true
                          : false
                      }
                    >
                      {pet.nombre}
                    </option>
                  ))
                ) : (
                  // Si no se pudieron obtener los datos
                  <option value={null} disabled>
                    Error al obtener el listado
                  </option>
                )}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="fecha">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                min="1900-01-01"
                max="2099-12-31"
                // ?Por optimizar..
                defaultValue={`${new Date(
                  consultEditShowInfoData.fecha
                ).getFullYear()}-${String(
                  new Date(consultEditShowInfoData.fecha).getMonth() + 1
                ).padStart(2, "0")}-${String(
                  new Date(consultEditShowInfoData.fecha).getDate()
                ).padStart(2, "0")}`}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="hora">
              <Form.Label>Hora</Form.Label>
              <Form.Control
                type="time"
                defaultValue={consultEditShowInfoData.hora}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="diagnostico">
              <Form.Label>Diagnóstico *</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={consultEditShowInfoData.diagnostico}
                rows="4"
                maxLength={250}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="tratamiento">
              <Form.Label>Tratamiento</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={consultEditShowInfoData.tratamiento}
                rows="4"
                maxLength={250}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="observaciones">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={consultEditShowInfoData.observaciones}
                rows="4"
                maxLength={250}
              />
            </Form.Group>
          </Col>
        </Row>

        {consultEditSubmitInfoIsLoading ? (
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
            navigate("/dashboard/consults");
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
      idMascota: event.target.idMascota.value,
      idUsuario: event.target.idUsuario.value,
      fecha: event.target.fecha.value,
      hora: event.target.hora.value,
      diagnostico: event.target.diagnostico.value,
      tratamiento: event.target.tratamiento.value,
      observaciones: event.target.observaciones.value,
      idConsulta: idConsult,
    });

    setConsultEditSubmitInfoMessage(null);
    setConsultEditSubmitInfoError(null);
    setConsultEditSubmitInfoIsLoading(true);
  }
}

export default ConsultEdit;
