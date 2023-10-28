import {
  Modal,
  Form,
  Button,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useEffect, useContext, useState } from "react";
import { newConsult } from "../../../../Services/consults.service.js";
import { ConsultContext } from "../../../../Context/ConsultsContext.jsx"; // Contexto de los consultas
import { getPetsNames } from "../../../../Services/pets.service.js";
import axios from "axios";
import { getVetUsernames } from "../../../../Services/users.service.js";

// Componente para crear una consulta
export default function NewConsultModal() {
  // Crear estado local con la fecha actual en formato YYYY-MM-DD
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [inputFecha, setInputFecha] = useState(formattedDate);

  // Crear estado local con la hora actual en formato HH:MM
  const formattedHour = today.toLocaleTimeString("es-ES");
  const [inputHora, setInputHora] = useState(
    formattedHour.padStart(8, "0").substring(0, 5)
  );

  // Contexto de consultas
  const {
    setConsultsListIsLoading,
    newConsultModal, // Modal
    setNewConsultModal,
    newConsultIsLoading, // Carga de de la API
    setNewConsultIsLoading,
    newConsultData, // Datos
    setNewConsultData,
    newConsultError, // Mensaje de error
    setNewConsultError,
  } = useContext(ConsultContext);

  // Estados locales para los desplegables de mascotas y usuarios
  const [loadingData, setLoadingData] = useState(true);
  const [vetsData, setVetsData] = useState(null);
  const [petsData, setPetsData] = useState(null);
  const [errorData, setErrorData] = useState(null);

  // Cargar datos del desplegable de mascotas y veterinarios
  useEffect(() => {
    if (loadingData && newConsultModal) {
      // Llamada a la API múltiple
      axios
        .all([getVetUsernames(), getPetsNames()])
        .then(({ ...res }) => {
          // 1º respuesta de la API (datos veterinarios)
          if (res[0].status === 200) {
            if (!res[0].data.error)
              setVetsData(res[0].data); // Si la API no devuelve errores
            else setErrorData(res[0].data.error); // Si la API devuelve errores
          }

          // 2º respuesta de la API (datos mascota)
          if (res[1].status === 200) {
            if (!res[1].data.error)
              setPetsData(res[1].data); // Si la API no devuelve errores
            else setErrorData(res[1].data.error); // Si la API devuelve errores
          }

          setLoadingData(false);
        })
        // Si alguna de las 2 solicitudes a la API devuelve una promesa en estado "rechazada"
        .catch((...err) => {
          setErrorData("Hubo un error al realizar la solicitud.");
          setLoadingData(false); // Cambiar estado, ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingData && newConsultModal]);

  // LLamada a la API cuando se pulsa el botón "Añadir"
  useEffect(() => {
    if (newConsultIsLoading) {
      newConsult(newConsultData)
        .then((res) => {
          // Si no se ha insertado el registro..
          if (!(res.data.affectedRows && res.data.affectedRows > 0)) {
            // Si la API ha devuelto errores, comprueba cual es
            if (res.data.error) {
              setNewConsultError(res.data.error);
              // Si no se ha insertado el registro y existe un error no controlado.
            } else {
              setNewConsultError(
                "Ocurrió un error interno en el servidor (500)"
              );
            }

            // Si el usuario se ha insertado..
          } else {
            setNewConsultModal(false); // Cierra el modal
            setConsultsListIsLoading(true); // Carga la lista de consultas
          }

          setNewConsultIsLoading(false);
        })
        .catch((err) => {
          setNewConsultError("Hubo un error al realizar la solicitud."); // Almacenar error
          setNewConsultIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newConsultIsLoading]);

  // Efecto para limpiar estados del formulario cuando se oculta
  useEffect(() => {
    if (!newConsultModal) {
      setNewConsultError(null);
      setNewConsultData(null);
      setNewConsultIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newConsultModal]);

  return (
    <Modal
      show={newConsultModal}
      onHide={() => setNewConsultModal(false)}
      backdrop="static"
      keyboard={false}
      size={"lg"}
    >
      <Modal.Header className="justify-content-center">
        <h4 className="mb-0">Nueva Consulta</h4>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => handleSubmit(event)} id="newConsultForm">
          <Container>
            {/** Errores de la API */}
            {newConsultError ? (
              <Alert variant="danger" className="w-75">
                <h6 className="mb-0">{newConsultError}</h6>
              </Alert>
            ) : null}

            <p>Los campos marcados con (*) son obligatorios.</p>
            <Row>
              <Col>
                {/* Recorrer JSON de usuarios (veterinarios) */}
                <Form.Group className="mb-3" controlId="idUsuario">
                  <Form.Label>Atendido por</Form.Label>
                  <Form.Select>
                    {/* Si existen los datos y no hay errores */}
                    {vetsData && !errorData ? (
                      // Recorre el JSON
                      vetsData.map((vet) => (
                        // Mostrando una opción por cada usuario veterinario
                        <option value={vet.idUsuario} key={vet.idUsuario}>
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
                  <Form.Label>Mascota: </Form.Label>
                  <Form.Select>
                    {/* Si existen los datos y no hay errores */}
                    {petsData && !errorData ? (
                      // Recorre el JSON
                      petsData.map((pet) => (
                        // Mostrando una opción por cada usuario veterinario
                        <option value={pet.idMascota} key={pet.idMascota}>
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
                    value={inputFecha}
                    onChange={(event) => setInputFecha(event.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="hora">
                  <Form.Label>Hora</Form.Label>
                  <Form.Control
                    type="time"
                    value={inputHora}
                    onChange={(event) => setInputHora(event.target.value)}
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
                    rows="4"
                    maxLength={250}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="tratamiento">
                  <Form.Label>Tratamiento</Form.Label>
                  <Form.Control as="textarea" rows="4" maxLength={250} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="observaciones">
                  <Form.Label>Observaciones</Form.Label>
                  <Form.Control as="textarea" rows="4" maxLength={250} />
                </Form.Group>
              </Col>
            </Row>
          </Container>

          {/** Botones del formulario */}
          {newConsultIsLoading ? (
            <Button variant="success" className="me-2" disabled>
              <Spinner animation="grow" size="sm" />
              Añadir
            </Button>
          ) : (
            <Button type="submit" variant="success" className="me-2">
              Añadir
            </Button>
          )}
          <Button
            onClick={() => {
              setNewConsultModal(false);
              setConsultsListIsLoading(true);
            }}
            variant="danger"
            className="me-2"
          >
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  // Funcionalidad del botón de "Aceptar" cuando se hace login
  function handleSubmit(event) {
    event.preventDefault();

    // Consulta en formato JSON resultado del formulario
    setNewConsultData({
      idUsuario: event.target.idUsuario.value,
      idMascota: event.target.idMascota.value,
      fecha: event.target.fecha.value,
      hora: event.target.hora.value,
      diagnostico: event.target.diagnostico.value,
      tratamiento:
        event.target.tratamiento.value.length > 0
          ? event.target.tratamiento.value
          : null,
      observaciones:
        event.target.observaciones.value.length > 0
          ? event.target.observaciones.value
          : null,
    });

    setNewConsultError(null);
    setNewConsultIsLoading(true);
  }
}
