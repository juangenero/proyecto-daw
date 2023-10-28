import { AppContext } from "../../../Context/AppContext";
import { UserContext } from "../../../Context/UserContext";

import React, { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUser, getUser } from "../../../Services/users.service.js";
import { Container, Row, Col, Alert, Spinner, Form, Button } from "react-bootstrap";
import Loading from "../../../Components/Utils/Loading";
import Error from "../../../Components/Utils/Error";
import md5 from "md5";
import imgToBase64 from "../../../Utils/imgToBase64";

function UserEdit({ renderingMode = "client" }) {
  const navigate = useNavigate();
  const [img, setImg] = useState(null); // Imagen de usuario
  const { user } = useContext(AppContext);

  // Por defecto, idUser es sacado de la URL
  let idUser = useParams().idUser;
  // Pero si el componente se está renderizando para un cliente, entonces idUser es el del usuario autenticado.
  if (renderingMode === "client") idUser = user.id;

  const {
    // Estados para cargar el usuario en el formulario
    userEditShowInfoIsLoading, // Cargar datos formulario
    setUserEditShowInfoIsLoading,
    userEditShowInfoData, // Datos formulario
    setUserEditShowInfoData,
    userEditShowInfoError, // Errores datos formulario
    setUserEditShowInfoError,

    // Estados para editar los datos del usuario
    userEditSubmitInfoIsLoading, // Cargar datos botón submit
    setUserEditSubmitInfoIsLoading,
    userEditSubmitInfoData, // Enviar datos del formulario
    setUserEditSubmitInfoData,
    userEditSubmitInfoMessage, // Resultado de intentar editar el usuario
    setUserEditSubmitInfoMessage,
    userEditSubmitInfoError, // Mensaje de error de intentar editar el usuario
    setUserEditSubmitInfoError,
  } = useContext(UserContext);

  // Cargar datos en el formulario de edición
  useEffect(() => {
    if (userEditShowInfoIsLoading) {
      // Llamada al método asíncrono
      getUser(idUser)
        .then((res) => {
          // Si la petición se ha ejecutado correctamente
          if (res.status === 200) {
            setUserEditShowInfoData(res.data); // Guardar datos en el estado
            setImg(res.data.imagen); // Guardo la imagen de la BD en el estado (local) de forma independiente
            if (res.data.error) {
              setUserEditShowInfoError(res.data.error); // Almacenar error enviado por la API.
            }
          } else {
            setUserEditShowInfoError("Hubo un error al mostrar los usuarios."); // Almacenar error
          }

          setUserEditShowInfoIsLoading(false); // Cambiar el estado, ya tenemos los datos o el mensaje de error.
        })
        .catch(() => {
          setUserEditShowInfoError("Hubo un error al realizar la solicitud."); // Almacenar error
          setUserEditShowInfoIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEditShowInfoIsLoading]);

  // Enviar datos al servidor
  useEffect(() => {
    if (userEditSubmitInfoIsLoading) {
      editUser(userEditSubmitInfoData)
        .then((res) => {
          // Si se ha editado el registro, almacena el un mensaje indicándolo
          if (res.data.affectedRows && res.data.affectedRows > 0) {
            setUserEditSubmitInfoMessage("Usuario editado correctamente.");

            // Si no se ha editado, comprueba el motivo
          } else {
            // Si la API ha devuelto errores..
            if (res.data.error) {
              const email = res.data.error.email;
              const dni = res.data.error.dni;
              const telephone = res.data.error.telephone;

              if (email && dni && telephone) {
                setUserEditSubmitInfoError(
                  "El email, dni y teléfono introducidos ya existen en la base de datos."
                );
              } else if (email && dni) {
                setUserEditSubmitInfoError(
                  "El email y dni introducidos ya existen en la base de datos."
                );
              } else if (email && telephone) {
                setUserEditSubmitInfoError(
                  "El email y teléfono introducidos ya existen en la base de datos."
                );
              } else if (email) {
                setUserEditSubmitInfoError("El email introducido ya existe en la base de datos.");
              } else if (dni && telephone) {
                setUserEditSubmitInfoError(
                  "El dni y teléfono introducidos ya existen en la base de datos."
                );
              } else if (dni) {
                setUserEditSubmitInfoError("El dni introducido ya existe en la base de datos.");
              } else if (telephone) {
                setUserEditSubmitInfoError(
                  "El teléfono introducido ya existe en la base de datos."
                );
              } else {
                setUserEditSubmitInfoError("Email, dni o teléfono ya existentes!");
              }
            }
          }
          setUserEditSubmitInfoIsLoading(false);
        })
        .catch((err) => {
          setUserEditSubmitInfoError("Hubo un error al realizar la solicitud."); // Almacenar error
          setUserEditSubmitInfoIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEditSubmitInfoIsLoading]);

  // Si está cargando (llamada a la API para cargar datos en el formulario)
  if (userEditShowInfoIsLoading) {
    return <Loading />;
  }

  // Si hay errores (llamada a la API para cargar datos en el formulario)
  if (userEditShowInfoError) {
    return (
      <Error
        error={userEditShowInfoError}
        actions={() => {
          if (renderingMode === "vet") {
            navigate("/dashboard/users/" + idUser + "/edit");
          } else if (renderingMode === "client") {
            navigate("/dashboard/profile/edit");
          }
        }}
      />
    );
  }

  // Formulario de edición
  return (
    <Form onSubmit={(event) => handleSubmit(event)}>
      <Container>
        {/** Respuesta de la API (Usuario editado) */}
        {userEditSubmitInfoMessage ? (
          <Alert variant="success" className="w-50">
            <h6 className="mb-0">{userEditSubmitInfoMessage}</h6>
          </Alert>
        ) : null}
        {/** Respuesta de la API (Errores) */}
        {userEditSubmitInfoError ? (
          <Alert variant="danger" className="w-75">
            <h6 className="mb-0">{userEditSubmitInfoError}</h6>
          </Alert>
        ) : null}

        <p>Los campos marcados con (*) son obligatorios.</p>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="id">
              <Form.Label>ID usuario</Form.Label>
              <Form.Control type="text" defaultValue={userEditShowInfoData.idUsuario} disabled />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Dejar en blanco para no cambiarla"
                pattern="^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,24}$"
                title="Minúsculas, mayúsculas, números y entre 6 y 24 carácteres"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userEditShowInfoData.nombre}
                maxLength={25}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="lastName">
              <Form.Label>Apellidos *</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userEditShowInfoData.apellidos}
                maxLength={50}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="dni">
              <Form.Label>Dni *</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userEditShowInfoData.dni}
                minLength={9}
                maxLength={9}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="telephone">
              <Form.Label>Teléfono *</Form.Label>
              <Form.Control
                type="tel"
                defaultValue={userEditShowInfoData.telefono}
                minLength={9}
                maxLength={9}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                defaultValue={userEditShowInfoData.email}
                maxLength={80}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="location">
              <Form.Label>Localidad</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userEditShowInfoData.localidad}
                maxLength={50}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="province">
              <Form.Label>Provincia</Form.Label>
              <Form.Control
                type="text"
                defaultValue={userEditShowInfoData.provincia}
                maxLength={50}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Código postal</Form.Label>
              <Form.Control
                type="number"
                defaultValue={userEditShowInfoData.cPostal}
                maxLength={5}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="dateOfBirth">
              <Form.Label>Fecha nacimiento</Form.Label>
              <Form.Control
                type="date"
                defaultValue={userEditShowInfoData.fechaNacimiento}
                min="1970-01-01"
                max="2099-12-31"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="image">
              <Form.Label>Imagen del perfil (1 MB máximo)</Form.Label>
              <Form.Control type="file" accept=".png, .jpg" onChange={handleImg} />
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex">
          {/** Botón editar */}
          {userEditSubmitInfoIsLoading ? (
            <Button variant="success" className="mx-1 mt-2" disabled>
              <Spinner animation="grow" size="sm" />
              Editar
            </Button>
          ) : (
            <Button type="submit" variant="success" className="mx-1 mt-2">
              Editar
            </Button>
          )}

          <Button
            variant="danger"
            className="mx-1 mt-2"
            onClick={() => {
              if (renderingMode === "vet") {
                navigate("/dashboard/users");
              } else if (renderingMode === "client") {
                navigate("/dashboard/profile");
              }
            }}
          >
            Cancelar
          </Button>

          {/** Este botón sólo está disponible para los veterinarios, ya que para los clientes, el botón de "Cancelar" realiza su función */}
          {renderingMode === "vet" ? (
            <Button
              className="mx-1 mt-2 ms-auto"
              onClick={() => {
                navigate("/dashboard/users/" + idUser);
              }}
            >
              Ver perfil
            </Button>
          ) : null}
        </div>
      </Container>
    </Form>
  );

  // Función del botón "Editar"
  function handleSubmit(event) {
    event.preventDefault();

    // Construir el JSON para enviarlo al servidor
    setUserEditSubmitInfoData({
      id: event.target.id.value,
      password: event.target.password.value.length > 0 ? md5(event.target.password.value) : "", // Si hay contraseña, la encripta
      name: event.target.name.value,
      lastName: event.target.lastName.value,
      dni: event.target.dni.value,
      telephone: event.target.telephone.value,
      email: event.target.email.value,
      location: event.target.location.value.length > 0 ? event.target.location.value : null,
      province: event.target.province.value.length > 0 ? event.target.province.value : null,
      postalCode: event.target.postalCode.value.length > 0 ? event.target.postalCode.value : null,
      dateOfBirth:
        event.target.dateOfBirth.value.length > 0 ? event.target.dateOfBirth.value : null,
      image: img,
    });

    // Restablecer los 2 estados de los mensajes, para que no se muestren ambos
    setUserEditSubmitInfoError(null);
    setUserEditSubmitInfoMessage(null);
    setUserEditSubmitInfoIsLoading(true); // Estado "cargando" de la segunda llamada a la API para editar el usuario
  }

  function handleImg(event) {
    const file = event.target.files[0];
    const maxSize = 1024000; // 1 MB

    // Si no supera el tamaño máximo, serializa la imagen
    if (file && file.size < maxSize) {
      imgToBase64(file, (callback) => {
        setImg(callback);
      });
    } else {
      event.target.value = "";
    }
  }
}

export default UserEdit;
