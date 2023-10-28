import React, { useEffect, useContext } from "react";
import { VaccineContext } from "../../../../Context/VaccineContext";
import { Alert, Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { newVaccine } from "../../../../Services/vaccines.service";

function NewVaccineModal() {
  const {
    newVaccineModal, // Estado del modal "Nueva vacuna"
    setNewVaccineModal,
    newVaccineIsLoading, // Cargar llamada a la API
    setNewVaccineIsLoading,
    newVaccineData, // Almacenar los datos del formulario
    setNewVaccineData,
    newVaccineError, // Errores al insertar la vacuna
    setNewVaccineError,
    newVaccineMessage, // Mensaje de vacuna insertada
    setNewVaccineMessage,
    setVaccineListIsLoading, // Para recargar la lista de vacunas
  } = useContext(VaccineContext);

  // Llamada a la API
  useEffect(() => {
    // Si el estado es cargando, llama a la API
    if (newVaccineIsLoading) {
      newVaccine(newVaccineData)
        .then((res) => {
          // Si no se ha editado el registro..
          if (!(res.data.affectedRows && res.data.affectedRows > 0)) {
            // Si la API ha devuelto errores
            if (res.data.error) {
              setNewVaccineError(res.data.error);

              // Si no se ha insertado el registro y existe un error no controlado.
            } else {
              setNewVaccineError("Ocurrió un error interno en el servidor (500)");
            }

            // Si el usuario se ha insertado..
          } else {
            setNewVaccineMessage("Vacuna insertada correctamente.");
          }

          setNewVaccineIsLoading(false);
        })
        .catch((err) => {
          setNewVaccineError("Hubo un error al realizar la solicitud."); // Almacenar error
          setNewVaccineIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVaccineIsLoading]);

  // Efecto para resetear el formulario cuando se oculta
  useEffect(() => {
    if (!newVaccineModal) {
      setNewVaccineMessage(null);
      setNewVaccineError(null);
      setNewVaccineData(null);
      setNewVaccineIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVaccineModal]);

  return (
    <Modal
      show={newVaccineModal}
      onHide={() => setNewVaccineModal(false)}
      backdrop="static"
      keyboard={false}
      size={"lg"}
    >
      <Modal.Header className="justify-content-center">
        <h4 className="mb-0">Nueva vacuna</h4>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => handleSubmit(event)} id="newVaccineForm">
          <Container>
            {/** Errores de la API (Usuario insertado) */}
            {newVaccineError ? (
              <Alert variant="danger" className="w-75">
                <h6 className="mb-0">{newVaccineError}</h6>
              </Alert>
            ) : null}

            {/** Errores de la API (Usuario insertado) */}
            {newVaccineMessage ? (
              <Alert variant="success" className="w-50">
                <h6 className="mb-0">{newVaccineMessage}</h6>
              </Alert>
            ) : null}

            <p>Los campos marcados con (*) son obligatorios.</p>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control type="text" minLength={3} maxLength={50} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="observaciones">
                  <Form.Label>Observaciones</Form.Label>
                  <Form.Control as="textarea" rows={2} maxLength={250} />
                </Form.Group>
              </Col>
            </Row>
          </Container>

          {/** Mensaje de error */}
          {0 ? <Alert variant="danger">mensaje</Alert> : null}

          {/** Botones del formulario */}
          {newVaccineIsLoading ? (
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
              setNewVaccineModal(false);
              setVaccineListIsLoading(true);
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

  function handleSubmit(event) {
    event.preventDefault();

    setNewVaccineData({
      nombre: event.target.nombre.value,
      observaciones:
        event.target.observaciones.value.length > 0 ? event.target.observaciones.value : null, // Si no ha escrito nada, el valor será null
    });

    setNewVaccineError(null); // Eliminar los errores anteriores
    setNewVaccineMessage(null); // Eliminar los mensajes anteriores
    setNewVaccineIsLoading(true); // Pone el estado cargando en true
  }
}

export default NewVaccineModal;
