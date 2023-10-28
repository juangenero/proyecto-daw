import React, { useEffect, useContext, useState } from "react";
import { VaccineAplicationsContext } from "../../../../Context/VaccineAplicationsContext";
import { Alert, Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { getAllVaccines } from "../../../../Services/vaccines.service";
import { newVaccineApplication } from "../../../../Services/vaccineAplications.service";
import { useParams } from "react-router-dom";

function NewVaccineAplicationsModal() {
  const idPet = useParams().idPet; // Extraer ID de la mascota en la URL

  // Las siguientes 3 líneas crea el estado inputFecha con un valor inicial que sea la fecha de hoy en formato YYYY-MM-DD
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2,"0")}`;
  const [inputFecha, setInputFecha] = useState(formattedDate);

  // Al llamar desde el perfil de la mascota al modal, los estados no terminan de limpiarse, ya que no se está cambiando de URL, creo estos 3 estados locales para el modal de aplicar vacuna, y que no interfieran con el contexto de VaccineContext.
  const [vaccineLoading, setVaccineLoading] = useState(true);
  const [vaccineData, setVaccineData] = useState(null);

  const {
    newVaccineAplicationsModal, // Estado del modal "Nueva aplicación de vacuna"
    setNewVaccineAplicationsModal,
    newVaccineAplicationsIsLoading, // Cargar llamada a la API
    setNewVaccineAplicationsIsLoading,
    newVaccineAplicationsData, // Almacenar los datos del formulario
    setNewVaccineAplicationsData,
    newVaccineAplicationsError, // Errores al insertar la vacuna
    setNewVaccineAplicationsError,
  } = useContext(VaccineAplicationsContext);

  // 1º llamada a la API, para obtener el id y nombre de las vacunas (Cuando se carga el modal)
  useEffect(() => {
    if (vaccineLoading) {
      getAllVaccines()
        .then((res) => {
          // Si la petición se ha ejecutado correctamente.
          if (res.status === 200) {
            setVaccineData(res.data); // Guardar datos.
          }

          setVaccineLoading(false);
        })
        .catch((err) => {
          setVaccineLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccineLoading]);

  // 2º llamada a la API, para aplicar la vacuna la mascota (Cuando se pulsa el botón añadir)
  useEffect(() => {
    // Si el estado es cargando, llama a la API
    if (newVaccineAplicationsIsLoading) {
      newVaccineApplication(newVaccineAplicationsData)
        .then((res) => {
          // Si no se ha insertado el registro..
          if (!(res.data.affectedRows && res.data.affectedRows > 0)) {
            // Si la API ha devuelto errores
            if (res.data.error) {
              setNewVaccineAplicationsError(res.data.error);
              // Si no se ha insertado el registro y existe un error no controlado.
            } else {
              setNewVaccineAplicationsError("Ocurrió un error interno en el servidor (500)");
            }
          } else {
            setNewVaccineAplicationsModal(false);
          }

          setNewVaccineAplicationsIsLoading(false);
        })
        .catch((err) => {
          setNewVaccineAplicationsError("Hubo un error al realizar la solicitud."); // Almacenar error
          setNewVaccineAplicationsIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVaccineAplicationsIsLoading]);

  // Efecto para resetear el formulario cuando se oculta
  useEffect(() => {
    if (!newVaccineAplicationsModal) {
      setNewVaccineAplicationsIsLoading(false);
      setNewVaccineAplicationsData(null);
      setNewVaccineAplicationsError(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVaccineAplicationsModal]);

  // Si no está cargando los datos, se pueden mostrar
  if (!vaccineLoading) {
    return (
      <Modal
        show={newVaccineAplicationsModal}
        onHide={() => setNewVaccineAplicationsModal(false)}
        backdrop="static"
        keyboard={false}
        size={"sm"}
      >
        <Modal.Header className="justify-content-center">
          <h4 className="mb-0">Añadir Aplicación de Vacuna</h4>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(event) => handleSubmit(event)} id="newVaccineAplicationsForm">
            <Container>
              {/** Errores de la API (2º llamada - Aplicar vacuna) */}
              {newVaccineAplicationsError ? (
                <Alert variant="danger" className="w-100">
                  <h6 className="mb-0">{newVaccineAplicationsError}</h6>
                </Alert>
              ) : null}

              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="vacuna">
                    <Form.Label>Vacuna</Form.Label>
                    <Form.Select>
                      {vaccineData.map((item) => (
                        <option key={item.idVacuna} value={item.idVacuna}>
                          {item.vacuna}
                        </option>
                      ))}
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
              </Row>
            </Container>

            {/** Botones del formulario */}
            {newVaccineAplicationsIsLoading ? (
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
                setNewVaccineAplicationsModal(false);
                setNewVaccineAplicationsIsLoading(false);
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
  }

  function handleSubmit(event) {
    event.preventDefault();

    setNewVaccineAplicationsData({
      idMascota: idPet,
      idVacuna: event.target.vacuna.value,
      fecha: event.target.fecha.value,
    });

    setNewVaccineAplicationsError(null); // Eliminar los errores anteriores
    setNewVaccineAplicationsIsLoading(true); // Pone el estado cargando en true
  }
}

export default NewVaccineAplicationsModal;
