import React from "react";
import { useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { UserContext } from "../../../../Context/UserContext";

function DeleteUserWarningModal() {
  const {deleteWarningModalShow, setDeleteWarningModalShow} = useContext(UserContext);

  return (
    <Modal show={deleteWarningModalShow} onHide={() => setDeleteWarningModalShow(false)}>
      <Modal.Header>
        <Modal.Title>⚠ Acción no permitida</Modal.Title>
      </Modal.Header>
      <Modal.Body>No puedes eliminar tu propio usuario.</Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={() => setDeleteWarningModalShow(false)}>
          Aceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUserWarningModal;
