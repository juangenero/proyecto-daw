import React, { useEffect } from "react";
import { useContext } from "react";
import { Alert, Spinner, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { VaccineAplicationsContext } from "../../../../Context/VaccineAplicationsContext";
import { deleteVaccineApplication } from "../../../../Services/vaccineAplications.service";

export default function DeleteVaccineAplicationsModal() {
  const {
    deleteVaccineAplicationsModal,
    setDeleteVaccineAplicationsModal,
    deleteVaccineAplicationsIsLoading,
    setDeleteVaccineAplicationsIsLoading,
    deleteVaccineAplicationsError,
    setDeleteVaccineAplicationsError,
    setSelectedVaccine,
    selectedVaccine,
  } = useContext(VaccineAplicationsContext);

  useEffect(() => {
    if (deleteVaccineAplicationsIsLoading) {
      deleteVaccineApplication({
        idMascota: selectedVaccine.idMascota,
        idVacuna: selectedVaccine.idVacuna,
        fecha: selectedVaccine.fecha,
      })
        .then((res) => {
          // Si no se ha eliminado el registro
          if (res.data.affectedRows < 1) {
            setDeleteVaccineAplicationsError(res.data.error);
          } else {
            setDeleteVaccineAplicationsModal(false);
          }

          setDeleteVaccineAplicationsIsLoading(false);
        })
        .catch((err) => {
          setDeleteVaccineAplicationsError("Error al realizar la solicitud."); // Almacenar error
          setDeleteVaccineAplicationsIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteVaccineAplicationsIsLoading]);

  // Limpiar estados al cerrar el modal
  useEffect(() => {
    if (!deleteVaccineAplicationsModal) {
      setDeleteVaccineAplicationsIsLoading(false);
      setDeleteVaccineAplicationsError(null);
      setSelectedVaccine(null);
    }
  });

  return (
    <Modal
      show={deleteVaccineAplicationsModal}
      onHide={() => setDeleteVaccineAplicationsModal(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Eliminar Aplicación de Vacuna</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/** Necesito poner este condicional, ya que cuando carga el modal en oculto, intenta renderizar datos que aún no existen */}
        ¿Seguro que quieres eliminar la vacuna{" "}
        <b>{selectedVaccine ? selectedVaccine.vacuna : null}</b> aplicada a{" "}
        <b>{selectedVaccine ? selectedVaccine.mascota : null}</b> el{" "}
        <b>{selectedVaccine ? selectedVaccine.fecha : null}</b> forma permanente?
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap="2">
          {/** Mensaje de error */}
          {deleteVaccineAplicationsError ? (
            <Alert className="my-0 py-1" variant="danger">
              {deleteVaccineAplicationsError}
            </Alert>
          ) : null}

          {deleteVaccineAplicationsIsLoading ? (
            <Button variant="success" disabled>
              <Spinner animation="grow" size="sm" />
              Aceptar
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={async () => {
                setDeleteVaccineAplicationsIsLoading(true); // Llamar a la API
              }}
            >
              Aceptar
            </Button>
          )}

          <Button variant="danger" onClick={() => setDeleteVaccineAplicationsModal(false)}>
            Cancelar
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
