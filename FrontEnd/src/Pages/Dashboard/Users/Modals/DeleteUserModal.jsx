import React, { useEffect } from "react";
import { useContext } from "react";
import { Alert, Spinner, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UserContext } from "../../../../Context/UserContext";
import { deleteUser } from "../../../../Services/users.service.js";

export default function DeleteUserModal() {
  const {
    userDeleteModalShow, // Modal
    setUserDeleteModalShow,
    userDeleteIsLoading, // Cargar
    setUserDeleteIsLoading,
    userDeleteError, // Mensaje de error
    setUserDeleteError,
    selectedUser, // Datos pasados desde UserList
    setUserListIsLoading, // Para actualizar la lista de usuarios
  } = useContext(UserContext);

  useEffect(() => {
    if (userDeleteIsLoading) {
      deleteUser(selectedUser.id)
        .then((res) => {
          // Si se ha eliminado el usuario
          if (res.data.affectedRows > 0) {
            setUserListIsLoading(true); // Pone a cargar la lista de usuarios
            setUserDeleteModalShow(false); // Oculta la ventana de confirmar eliminación
          } else if (res.data.error) {
            setUserDeleteError(res.data.error);
          }

          setUserDeleteIsLoading(false);
        })
        .catch((err) => {
          setUserDeleteError("Error al realizar la solicitud."); // Almacenar error
          setUserDeleteIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDeleteIsLoading]);

  // Limpiar estados al cerrar el modal
  useEffect(() => {
    if (!userDeleteModalShow) {
      setUserListIsLoading(false);
      setUserDeleteError(null);
    }
  });

  return (
    <Modal
      show={userDeleteModalShow}
      onHide={() => setUserDeleteModalShow(false)}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Eliminar usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/** Necesito poner este condicional, ya que cuando carga el modal en oculto, intenta renderizar datos que aún no existen */}
        ¿Seguro que quieres eliminar al usuario <b>{selectedUser ? selectedUser.email : null}</b> de
        forma permanente?
      </Modal.Body>
      <Modal.Footer>
        <Stack direction="horizontal" gap="2">
          {userDeleteError ? (
            <Alert className="my-0 py-1" variant="danger">
              {userDeleteError}
            </Alert>
          ) : null}

          {userDeleteIsLoading ? (
            <Button variant="success" disabled>
              <Spinner animation="grow" size="sm" />
              Aceptar
            </Button>
          ) : (
            <Button
              variant="success"
              onClick={async () => {
                setUserDeleteIsLoading(true); // Llamar a la API
              }}
            >
              Aceptar
            </Button>
          )}

          <Button variant="danger" onClick={() => setUserDeleteModalShow(false)}>
            Cancelar
          </Button>
        </Stack>
      </Modal.Footer>
    </Modal>
  );
}
