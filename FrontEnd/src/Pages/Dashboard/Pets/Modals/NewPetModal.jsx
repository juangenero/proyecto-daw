import React, { useEffect } from "react";
import { useContext } from "react";
import { Alert, Button, Col, Container, Form, Modal, Row, Spinner } from "react-bootstrap";
import { PetsContext } from "../../../../Context/PetsContext";
import { AppContext } from "../../../../Context/AppContext";
import { getClientUsernames } from "../../../../Services/users.service";
import { dateFormat } from "../../../../Utils/dateFormat";
import { useState } from "react";
import imgToBase64 from "../../../../Utils/imgToBase64";
import { newPet } from "../../../../Services/pets.service";

function NewPetModal() {
  const { user } = useContext(AppContext);
  const [img, setImg] = useState(null);

  const {
    newPetModal, // Mostrar modal para añadir mascota
    setNewPetModal,

    newPetIsLoading, // Cargar petición de edición de usuario
    setNewPetIsLoading,
    newPetData, // Datos del formulario de edición
    setNewPetData,
    newPetError, // Error del formulario de edición
    setNewPetError,
    newPetMessage, // Mensaje de mascota añadida
    setNewPetMessage,

    newPetUsers, // Nombre de usuarios
    setNewPetUsers,

    setPetsListIsLoading, // Actualizar listado de mascotas
  } = useContext(PetsContext);

  // Llamada a la API (Obtener usuarios)
  useEffect(() => {
    // Si se abre el modal y el usuario logueado es un veterinario, obtiene la lista de clientes
    if (newPetModal && user.rol) {
      getClientUsernames().then((res) => {
        if (!res.data.error) setNewPetUsers(res.data);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPetModal]);

  // Llamada a la API (Edición de mascota)
  useEffect(() => {
    if (newPetIsLoading) {
      newPet(newPetData)
        .then((res) => {
          // Si no se ha editado el registro..
          if (!(res.data.affectedRows && res.data.affectedRows > 0)) {
            // Si la API ha devuelto errores, comprueba cual es
            if (res.data.error) {
              setNewPetError(res.data.error);

              // Si no se ha insertado el registro y existe un error no controlado.
            } else {
              setNewPetError("Ocurrió un error interno en el servidor");
            }

            // Si el usuario se ha insertado..
          } else {
            setNewPetMessage("Mascota registrada correctamente.");
          }

          setNewPetIsLoading(false);
        })
        .catch((err) => {
          setNewPetError("Hubo un error al realizar la solicitud."); // Almacenar error
          setNewPetIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPetIsLoading]);

  // Efecto para resetear el formulario cuando se oculta
  useEffect(() => {
    if (!newPetModal) {
      setNewPetIsLoading(false);
      setNewPetData(null);
      setNewPetUsers(null);
      setNewPetError(null);
      setNewPetMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newPetModal]);

  return (
    <Modal
      show={newPetModal}
      onHide={() => setNewPetModal(false)}
      backdrop="static"
      keyboard={false}
      size={"lg"}
    >
      <Modal.Header className="justify-content-center">
        <h4 className="mb-0">Nueva mascota</h4>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => handleSubmit(event)} id="newUserForm">
          <Container>
            {/** Errores de la API */}
            {newPetError ? (
              <Alert variant="danger" className="w-75">
                <h6 className="mb-0">{newPetError}</h6>
              </Alert>
            ) : null}

            {/** Mensaje de la API (Usuario insertado) */}
            {newPetMessage ? (
              <Alert variant="success" className="w-50">
                <h6 className="mb-0">{newPetMessage}</h6>
              </Alert>
            ) : null}

            <p>Los campos marcados con (*) son obligatorios.</p>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="propietario">
                  <Form.Label>Propietario *</Form.Label>
                  {/* Muestra un desplegable a los veterinarios y un campo de texto no editable a los usuarios */}
                  {user.rol ? (
                    <Form.Select>
                      {/* Si existen usuarios, los muestra en el desplegable */}
                      {newPetUsers ? (
                        newPetUsers.map((item) => (
                          <option key={item.idUsuario} value={item.idUsuario}>
                            {item.nombre + " " + item.apellidos}
                          </option>
                        ))
                      ) : (
                        <option value={null}>-</option>
                      )}
                    </Form.Select>
                  ) : (
                    <Form.Control type="text" value={user.name + " " + user.lastName} disabled />
                  )}
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="nombre">
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control type="text" maxLength={50} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="especie">
                  <Form.Label>Especie *</Form.Label>
                  <Form.Control type="text" minLength={3} maxLength={30} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="raza">
                  <Form.Label>Raza</Form.Label>
                  <Form.Control type="text" maxLength={30} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="sexo">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select>
                    <option value={"Macho"}>Macho</option>
                    <option value={"Hembra"}>Hembra</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="peso">
                  <Form.Label>Peso (kg)</Form.Label>
                  <Form.Control type="number" step="any" max={999} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="fechaNacimiento">
                  <Form.Label>Fecha nacimiento</Form.Label>
                  <Form.Control type="date" min="1970-01-01" max="2099-12-31" required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="altura">
                  <Form.Label>Altura (cm)</Form.Label>
                  <Form.Control type="number" max={99} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="comentarios">
                  <Form.Label>Comentarios</Form.Label>
                  <Form.Control as="textarea" rows={2} maxLength={250} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Imagen de la mascota (1 MB máximo)</Form.Label>
                  <Form.Control type="file" accept=".png, .jpg" onChange={handleImg} />
                </Form.Group>
              </Col>
            </Row>
          </Container>

          {/** Mensaje de error */}
          {0 ? <Alert variant="danger">mensaje</Alert> : null}

          {/** Botones del formulario */}
          {newPetIsLoading ? (
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
              setNewPetModal(false);
              setPetsListIsLoading(true);
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

    setNewPetData({
      owner: user.rol ? event.target.propietario.value : user.id, // El valor del input para el rol cliente debe ser el ID del cliente
      name: event.target.nombre.value,
      specie: event.target.especie.value,
      race: event.target.raza.value.length > 0 ? event.target.raza.value : null,
      sex: event.target.sexo.value,
      weight: event.target.peso.value.length > 0 ? event.target.peso.value : null,
      registerDate: dateFormat(new Date()),
      dateOfBirth:
        event.target.fechaNacimiento.value.length > 0 ? event.target.fechaNacimiento.value : null,
      high: event.target.altura.value.length > 0 ? event.target.altura.value : null,
      comments: event.target.comentarios.value.length > 0 ? event.target.comentarios.value : null,
      image: img,
    });

    setNewPetError(null); // Eliminar los errores anteriores
    setNewPetMessage(null); // Eliminar los mensajes anteriores
    setNewPetIsLoading(true); // Pone el estado cargando en true
  }

  // Imagen de perfil
  function handleImg(event) {
    const file = event.target.files[0];
    const maxSize = 1024000; // 1 MB

    // Si no supera el tamaño máximo
    if (file && file.size < maxSize) {
      // Serializa la imagen
      imgToBase64(file, (callback) => {
        setImg(callback);
      });

      // Si supera el tamaño máximo
    } else {
      event.target.value = ""; // Borra la imagen seleccionada del input file
    }
  }
}

export default NewPetModal;
