import { Modal, Form, Button, Spinner, Alert, Container, Row, Col } from "react-bootstrap";
import { useEffect, useContext, useState } from "react";
import { newUser } from "../../../../Services/users.service.js";
import { UserContext } from "../../../../Context/UserContext"; // Contexto de los usuarios
import md5 from "md5";
import imgToBase64 from "../../../../Utils/imgToBase64.js";
import { dateFormat } from "../../../../Utils/dateFormat.js";

export default function NewUserModal() {
  const [img, setImg] = useState(null); // Estado local para almacenar la imagen en base64
  const [message, setMessage] = useState(null); // Estado local para el mensaje de usuario insertado

  const {
    setUserListIsLoading,
    newUserModalShow, // Modal
    setNewUserModalShow,
    newUserIsLoading, // Carga
    setNewUserIsLoading,
    newUserData, // Datos
    setNewUserData,
    newUserError, // Mensaje de error
    setNewUserError,
  } = useContext(UserContext);

  // Llamada a la API
  useEffect(() => {
    if (newUserIsLoading) {
      newUser(newUserData)
        .then((res) => {
          // Si no se ha editado el registro..
          if (!(res.data.affectedRows && res.data.affectedRows > 0)) {
            // Si la API ha devuelto errores, comprueba cual es
            if (res.data.error) {
              const email = res.data.error.email;
              const dni = res.data.error.dni;
              const telephone = res.data.error.telephone;

              if (email && dni && telephone) {
                setNewUserError(
                  "El email, dni y teléfono introducidos ya existen en la base de datos."
                );
              } else if (email && dni) {
                setNewUserError("El email y dni introducidos ya existen en la base de datos.");
              } else if (email && telephone) {
                setNewUserError("El email y teléfono introducidos ya existen en la base de datos.");
              } else if (email) {
                setNewUserError("El email introducido ya existe en la base de datos.");
              } else if (dni && telephone) {
                setNewUserError("El dni y teléfono introducidos ya existen en la base de datos.");
              } else if (dni) {
                setNewUserError("El dni introducido ya existe en la base de datos.");
              } else if (telephone) {
                setNewUserError("El teléfono introducido ya existe en la base de datos.");
              } else {
                setNewUserError("Email, dni o teléfono ya existentes!");
              }

              // Si no se ha insertado el registro y existe un error no controlado.
            } else {
              setNewUserError("Ocurrió un error interno en el servidor (500)");
            }

            // Si el usuario se ha insertado..
          } else {
            setMessage("Usuario registrado correctamente.");
          }

          setNewUserIsLoading(false);
        })
        .catch((err) => {
          console.log(err)
          setNewUserError("Hubo un error al realizar la solicitud."); // Almacenar error
          setNewUserIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUserIsLoading]);

  // Efecto para resetear el formulario cuando se oculta
  useEffect(() => {
    if (!newUserModalShow) {
      setMessage(null);
      setNewUserError(null);
      setNewUserData(null);
      setNewUserIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUserModalShow]);

  return (
    <Modal
      show={newUserModalShow}
      onHide={() => setNewUserModalShow(false)}
      backdrop="static"
      keyboard={false}
      size={"lg"}
    >
      <Modal.Header className="justify-content-center">
        <h4 className="mb-0">Nuevo usuario</h4>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => handleSubmit(event)} id="newUserForm">
          <Container>
            {/** Errores de la API (Usuario insertado) */}
            {newUserError ? (
              <Alert variant="danger" className="w-75">
                <h6 className="mb-0">{newUserError}</h6>
              </Alert>
            ) : null}
            {message ? (
              <Alert variant="success" className="w-50">
                <h6 className="mb-0">{message}</h6>
              </Alert>
            ) : null}
            {/** Errores de la API (Usuario insertado) */}
            <p>Los campos marcados con (*) son obligatorios.</p>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Contraseña *</Form.Label>
                  <Form.Control
                    type="password"
                    pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,24}$"
                    title="Minúsculas, mayúsculas, números y entre 6 y 24 carácteres"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control type="text" maxLength={25} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Apellidos *</Form.Label>
                  <Form.Control type="text" maxLength={50} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="dni">
                  <Form.Label>Dni *</Form.Label>
                  <Form.Control type="text" minLength={9} maxLength={9} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="telephone">
                  <Form.Label>Teléfono *</Form.Label>
                  <Form.Control type="tel" minLength={9} maxLength={9} required />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control type="email" maxLength={80} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="location">
                  <Form.Label>Localidad</Form.Label>
                  <Form.Control type="text" maxLength={50} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="province">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Control type="text" maxLength={50} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="postalCode">
                  <Form.Label>Código postal</Form.Label>
                  <Form.Control type="number" maxLength={5} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="dateOfBirth">
                  <Form.Label>Fecha nacimiento</Form.Label>
                  <Form.Control type="date" min="1970-01-01" max="2099-12-31" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="rol">
                  <Form.Label>Tipo de usuario</Form.Label>
                  <Form.Select>
                    <option value={0}>Cliente</option>
                    <option value={1}>Veterinario</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Imagen del perfil (1 MB máximo)</Form.Label>
                  <Form.Control type="file" accept=".png, .jpg" onChange={handleImg} />
                </Form.Group>
              </Col>
            </Row>
          </Container>

          {/** Botones del formulario */}
          {newUserIsLoading ? (
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
              setNewUserModalShow(false);
              setUserListIsLoading(true);
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

    // Usuario resultado del formulario
    setNewUserData({
      password: md5(event.target.password.value),
      name: event.target.name.value,
      lastName: event.target.lastName.value,
      dni: event.target.dni.value,
      telephone: event.target.telephone.value,
      email: event.target.email.value,
      location: event.target.location.value.length ? event.target.location.value : null,
      province: event.target.province.value.length ? event.target.province.value : null,
      postalCode: event.target.postalCode.value.length ? event.target.postalCode.value : null,
      registerDate: dateFormat(new Date()), // Parseo la fecha a formato YYYY-MM-DD, para la BD
      dateOfBirth: event.target.dateOfBirth.value.length ? event.target.dateOfBirth.value : null,
      rol: event.target.rol.value,
      image: img,
    });

    setMessage(null);
    setNewUserError(null);
    setNewUserIsLoading(true);
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
