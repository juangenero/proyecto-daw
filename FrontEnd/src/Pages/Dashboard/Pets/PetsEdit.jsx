import React, { useEffect, useState, useContext } from "react";
import { Alert, Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../../../Components/Utils/Error";
import Loading from "../../../Components/Utils/Loading";
import { AppContext } from "../../../Context/AppContext";
import { PetsContext } from "../../../Context/PetsContext";
import { getPetById, editPet } from "../../../Services/pets.service.js";
import { getClientUsernames } from "../../../Services/users.service";
import { dateFormat } from "../../../Utils/dateFormat";
import imgToBase64 from "../../../Utils/imgToBase64";

function PetsEdit() {
  const { user } = useContext(AppContext); // Contexto del login
  const navigate = useNavigate(); // Para redirigir a otra página
  const idPet = useParams().idPet; // ID de la mascota en la URL
  const [img, setImg] = useState(null); // Estado local para gestionar la imagen
  const [users, setUsers] = useState(null); // Estado local para obtener los nombres de los clientes
  const [owner, setOwner] = useState(0); // Estado local para el desplegable de clientes
  const [sex, setSex] = useState("Macho"); // Estado local para el desplegable del sexo de la mascota

  const {
    // Rescatar datos para rellenar el formulario
    petsViewIsLoading,
    setPetsViewIsLoading,
    petsViewData,
    setPetsViewData,
    petsViewError,
    setPetsViewError,

    // Edición de la mascota
    petEditIsLoading,
    setPetEditIsLoading,
    petEditData,
    setPetEditData,
    petEditMessage,
    setPetEditMessage,
    petEditError,
    setPetEditError,
  } = useContext(PetsContext);

  // Cargar datos del formulario de edición
  useEffect(() => {
    if (petsViewIsLoading) {
      // Llamada al método asíncrono
      getPetById(idPet)
        .then((res) => {
          // Si la petición se ha ejecutado correctamente
          if (res.status === 200) {
            if (res.data.error) {
              setPetsViewError(res.data.error); // Almacenar error enviado por la API.
            } else {
              setPetsViewData(res.data); // Guardar datos en el estado
              setOwner(res.data.idUsuario); // Almacenar el propietario de la mascota
              setSex(res.data.sexo); // Almacenar el sexo de la mascota
              setImg(res.data.imagen); // Guardo la imagen de la BD en el estado (local) de forma independiente
              getClientUsernames().then((res) => setUsers(res.data)); // Obtengo los nombres de los clientes
            }
          } else {
            setPetsViewError("Hubo un error al mostrar los usuarios."); // Almacenar error
          }

          setPetsViewIsLoading(false); // Cambiar el estado, ya tenemos los datos o el mensaje de error.
        })
        .catch(() => {
          setPetsViewError("Hubo un error al realizar la solicitud."); // Almacenar error
          setPetsViewIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petsViewIsLoading]);

  // Enviar datos del formulario al servidor
  useEffect(() => {
    if (petEditIsLoading) {
      editPet(petEditData)
        .then((res) => {
          // Si se ha editado el registro, almacena el un mensaje indicándolo
          if (res.data.affectedRows && res.data.affectedRows > 0) {
            setPetEditMessage("Mascota editada correctamente.");

            // Si no se ha editado, comprueba el motivo
          } else {
          }
          setPetEditIsLoading(false);
        })
        .catch((err) => {
          setPetEditError("Hubo un error al realizar la solicitud."); // Almacenar error
          setPetEditIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petEditIsLoading]);

  // Si está cargando los datos del formulario
  if (petsViewIsLoading) {
    return <Loading />;
  }

  // Si existen errores al cargar los datos en el formulario
  if (petsViewError) {
    return (
      <Error
        error={petsViewError}
        actions={() => {
          navigate("/dashboard/pets/" + idPet + "/edit");
        }}
      />
    );
  }

  // Formulario de edición
  return (
    <Form onSubmit={(event) => handleSubmit(event)} id="editUserForm">
      <Container>
        {/** Errores de la API */}
        {petEditError ? (
          <Alert variant="danger" className="w-75">
            <h6 className="mb-0">{petEditError}</h6>
          </Alert>
        ) : null}

        {/** Mensaje de la API (Usuario insertado) */}
        {petEditMessage ? (
          <Alert variant="success" className="w-50">
            <h6 className="mb-0">{petEditMessage}</h6>
          </Alert>
        ) : null}

        <p>Los campos marcados con (*) son obligatorios.</p>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="propietario">
              <Form.Label>Propietario *</Form.Label>
              {/* Muestra un desplegable distinto según el rol del usuario autenticado */}
              {user.rol ? (
                <Form.Select onChange={(event) => setOwner(event.target.value)} value={owner}>
                  {/* Si existen usuarios, los muestra en el desplegable */}
                  {users ? (
                    users.map((item) => (
                      <option key={item.idUsuario} value={item.idUsuario}>
                        {item.nombre + " " + item.apellidos}
                      </option>
                    ))
                  ) : (
                    <option value={null}>-</option>
                  )}
                </Form.Select>
              ) : (
                <Form.Select disabled>
                  <option value={user.id}>{user.name + " " + user.lastName}</option>
                </Form.Select>
              )}
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="nombre">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                maxLength={50}
                defaultValue={petsViewData.nombre}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="especie">
              <Form.Label>Especie *</Form.Label>
              <Form.Control
                type="text"
                minLength={3}
                maxLength={30}
                required
                defaultValue={petsViewData.especie}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="raza">
              <Form.Label>Raza</Form.Label>
              <Form.Control type="text" maxLength={30} defaultValue={petsViewData.raza} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="sexo">
              <Form.Label>Sexo</Form.Label>
              <Form.Select
                onChange={(event) => {
                  setSex(event.target.value);
                }}
                value={sex}
              >
                <option value={"Macho"}>Macho</option>
                <option value={"Hembra"}>Hembra</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="peso">
              <Form.Label>Peso (kg)</Form.Label>
              <Form.Control type="number" max={999} step="any" defaultValue={petsViewData.peso} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="fechaNacimiento">
              <Form.Label>Fecha nacimiento</Form.Label>
              <Form.Control
                type="date"
                defaultValue={petsViewData.fechaNacimiento}
                min="1970-01-01"
                max="2099-12-31"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="altura">
              <Form.Label>Altura (cm)</Form.Label>
              <Form.Control type="number" max={99} defaultValue={petsViewData.altura} />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="comentarios">
              <Form.Label>Comentarios</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                maxLength={250}
                defaultValue={petsViewData.comentarios}
              />
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
      {petEditIsLoading ? (
        <Button variant="success" className="me-2" disabled>
          <Spinner animation="grow" size="sm" />
          Editar
        </Button>
      ) : (
        <Button type="submit" variant="success" className="me-2">
          Editar
        </Button>
      )}
      <Button
        onClick={() => {
          navigate("/dashboard/pets");
        }}
        variant="danger"
        className="me-2"
      >
        Cancelar
      </Button>
    </Form>
  );

  // Función del botón "Editar"
  function handleSubmit(event) {
    event.preventDefault();

    // Construir el JSON para enviarlo al servidor
    setPetEditData({
      id: petsViewData.idMascota,
      owner: event.target.propietario.value,
      name: event.target.nombre.value,
      specie: event.target.especie.value,
      race: event.target.raza.value.length > 0 ? event.target.raza.value : null,
      sex: event.target.sexo.value,
      weight: event.target.peso.value.length > 0 ? event.target.peso.value : null,
      registerDate: dateFormat(new Date()), // Cambiar la fecha a formato YYYY-MM-DD, para la BD
      dateOfBirth:
        event.target.fechaNacimiento.value.length > 0 ? event.target.fechaNacimiento.value : null,
      high: event.target.altura.value.length > 0 ? event.target.altura.value : null,
      comments: event.target.comentarios.value.length > 0 ? event.target.comentarios.value : null,
      image: img,
    });

    // Restablecer los 2 estados de los mensajes, para que no se muestren ambos
    setPetEditError(null);
    setPetEditMessage(null);
    setPetEditIsLoading(true); // Estado "cargando" de la segunda llamada a la API para editar el usuario
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

export default PetsEdit;
