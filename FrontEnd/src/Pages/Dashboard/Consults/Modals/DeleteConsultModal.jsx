import React, { useEffect } from "react";
import { useContext } from "react";
import { Alert, Spinner, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ConsultContext } from "../../../../Context/ConsultsContext";
import { deleteConsult } from "../../../../Services/consults.service";

// Componente para eliminar consulta
export default function DeleteConsultModal() {
  const {
    consultDeleteModalShow, // Estado del modal
    setConsultDeleteModalShow,
    consultDeleteIsLoading, // Estado de la carga de la API
    setConsultDeleteIsLoading,
    consultDeleteError, // Estado para el posible mensaje de error
    setConsultDeleteError,
    selectedConsult, // Estado de la consulta seleccionada desde el listado de consultas
    setConsultsListIsLoading, // Estado para recargar la lista de consultas
  } = useContext(ConsultContext);

  // LLamada a la API
  useEffect(() => {
    if (consultDeleteIsLoading) {
      deleteConsult(selectedConsult.idConsulta)
        .then((res) => {
          // Si se ha eliminado el usuario
          if (res.data.affectedRows > 0) {
            setConsultsListIsLoading(true); // Pone a cargar la lista de consultas
            setConsultDeleteModalShow(false); // Oculta el modal de eliminar consulta
          } else if (res.data.error) {
            setConsultDeleteError(res.data.error);
          }

          setConsultDeleteIsLoading(false);
        })
        .catch((err) => {
          setConsultDeleteError("Error al realizar la solicitud."); // Almacenar error
          setConsultDeleteIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consultDeleteIsLoading]);

  // Limpiar estados al cerrar el modal
  useEffect(() => {
    if (!consultDeleteModalShow) {
      setConsultDeleteIsLoading(false);
      setConsultDeleteError(null);
    }
  });

  return (
    <Modal
      show={consultDeleteModalShow}
      onHide={() => setConsultDeleteModalShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Eliminar consulta</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/** Necesito poner este condicional, ya que cuando carga el modal en oculto, intenta renderizar datos que aún no existen */}
        ¿Seguro que quieres eliminar la consulta de <b>{selectedConsult ? selectedConsult.nombreMascota : null}</b> del <b>{selectedConsult ? selectedConsult.fecha : null}</b> a las <b>{selectedConsult ? selectedConsult.hora : null}</b> de forma permanente?
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap="2">
          {consultDeleteError ? (
            <Alert className="my-0 py-1" variant="danger">
              {consultDeleteError}
            </Alert>
          ) : null}

          {consultDeleteIsLoading ? (
            <Button variant="success" disabled>
              <Spinner animation="grow" size="sm" />
              Aceptar
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={async () => {
                setConsultDeleteIsLoading(true); // Llamar a la API
              }}
            >
              Aceptar
            </Button>
          )}

          <Button variant="danger" onClick={() => setConsultDeleteModalShow(false)}>
            Cancelar
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
