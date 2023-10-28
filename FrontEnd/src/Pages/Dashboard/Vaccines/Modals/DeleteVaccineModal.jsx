import React, { useEffect } from "react";
import { useContext } from "react";
import { Alert, Spinner, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { VaccineContext } from "../../../../Context/VaccineContext";
import { deleteVaccine } from "../../../../Services/vaccines.service";

export default function DeleteUserModal() {
  const {
    vaccineDeleteModal, // modal
    setVaccineDeleteModal,
    vaccineDeleteIsLoading, // llamada a la API
    setVaccineDeleteIsLoading,
    vaccineDeleteError, // Errores
    setVaccineDeleteError,
    selectedVaccine, // Vacuna seleccionada
    setVaccineListIsLoading, // Refrescar listado de vacunas
  } = useContext(VaccineContext);

  useEffect(() => {
    if (vaccineDeleteIsLoading) {
      deleteVaccine(selectedVaccine.id)
        .then((res) => {
          // Si se ha eliminado el usuario
          if (res.data.affectedRows > 0) {
            setVaccineListIsLoading(true); // Pone a cargar la lista de usuarios
            setVaccineDeleteModal(false); // Oculta la ventana de confirmar eliminación
          } else if (res.data.error) {
            setVaccineDeleteError(res.data.error);
          }

          setVaccineDeleteIsLoading(false);
        })
        .catch((err) => {
          setVaccineDeleteError("Error al realizar la solicitud."); // Almacenar error
          setVaccineDeleteIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccineDeleteIsLoading]);

  // Limpiar estados al cerrar el modal
  useEffect(() => {
    if (!vaccineDeleteModal) {
      setVaccineDeleteIsLoading(false);
      setVaccineDeleteError(null);
    }
  });

  return (
    <Modal
      show={vaccineDeleteModal}
      onHide={() => setVaccineDeleteModal(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Eliminar vacuna</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/** Necesito poner este condicional, ya que cuando carga el modal en oculto, intenta renderizar datos que aún no existen */}
        ¿Seguro que quieres eliminar la vacuna{" "}
        <b>{selectedVaccine ? selectedVaccine.nombre : null}</b> de forma permanente?
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap="2">
          {vaccineDeleteError ? (
            <Alert className="my-0 py-1" variant="danger">
              {vaccineDeleteError}
            </Alert>
          ) : null}

          {vaccineDeleteIsLoading ? (
            <Button variant="success" disabled>
              <Spinner animation="grow" size="sm" />
              Aceptar
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={async () => {
                setVaccineDeleteIsLoading(true); // Llamar a la API
              }}
            >
              Aceptar
            </Button>
          )}

          <Button variant="danger" onClick={() => setVaccineDeleteModal(false)}>
            Cancelar
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
