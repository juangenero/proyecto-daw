import React, { useEffect } from "react";
import { useContext } from "react";
import { Alert, Spinner, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PetsContext } from "../../../../Context/PetsContext";
import { deletePet } from "../../../../Services/pets.service";

export default function DeletePetModal() {
  const {
    petDeleteModalShow,
    setPetDeleteModalShow,
    petDeleteIsLoading,
    setPetDeleteIsLoading,
    petDeleteError,
    setPetDeleteError, // Para actualizar la lista de usuarios
    selectedPet,
    setPetsListIsLoading,
  } = useContext(PetsContext);

  // Llamada a la API
  useEffect(() => {
    if (petDeleteIsLoading) {
      deletePet(selectedPet.idMascota)
        .then((res) => {
          // Si se ha eliminado el usuario
          if (res.data.affectedRows > 0) {
            setPetsListIsLoading(true); // Pone a cargar la lista de usuarios
            setPetDeleteModalShow(false); // Oculta la ventana de confirmar eliminación
          } else if (res.data.error) {
            setPetDeleteError(res.data.error);
          }

          setPetDeleteIsLoading(false);
        })
        .catch((err) => {
          setPetDeleteError("Error al realizar la solicitud."); // Almacenar error
          setPetDeleteIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petDeleteIsLoading]);

  // Limpiar estados al cerrar el modal
  useEffect(() => {
    if (!petDeleteModalShow) {
      setPetsListIsLoading(false);
      setPetDeleteError(null);
    }
  });

  return (
    <Modal
      show={petDeleteModalShow}
      onHide={() => setPetDeleteModalShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Eliminar mascota</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/** Necesito poner este condicional, ya que cuando carga el modal en oculto, intenta renderizar datos que aún no existen */}
        ¿Seguro que quieres eliminar la mascota <b>{selectedPet ? selectedPet.nombre : null}</b> con ID <b>{selectedPet ? selectedPet.idMascota : null}</b> de forma permanente?
        <br />
        <b>Nota:</b> Todas sus consultas también se eliminarán.
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap="2">
          {petDeleteError ? (
            <Alert className="my-0 py-1" variant="danger">
              {petDeleteError}
            </Alert>
          ) : null}

          {petDeleteIsLoading ? (
            <Button variant="success" disabled>
              <Spinner animation="grow" size="sm" />
              Aceptar
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={async () => {
                setPetDeleteIsLoading(true); // Llamar a la API
              }}
            >
              Aceptar
            </Button>
          )}

          <Button variant="danger" onClick={() => setPetDeleteModalShow(false)}>
            Cancelar
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
