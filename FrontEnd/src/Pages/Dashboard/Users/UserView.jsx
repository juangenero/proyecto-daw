import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
import { UserContext } from "../../../Context/UserContext";
import { Container, Row, Col, Image, Stack, Button } from "react-bootstrap";
import Loading from "../../../Components/Utils/Loading";
import Error from "../../../Components/Utils/Error";
import { getUser } from "../../../Services/users.service";
import defaultUserAvatar from "../../../Img/defaultUserAvatar.png";

function UserView({ renderingMode = "client" }) {
  const navigate = useNavigate();
  const { user } = useContext(AppContext);

  // Por defecto, idUser es sacado de la URL
  let idUser = useParams().idUser;

  // Pero si el componente se está renderizando para un cliente, entonces idUser es el del usuario autenticado.
  if (renderingMode === "client") idUser = user.id;

  const {
    userViewIsLoading, // Cargando datos
    setUserViewIsLoading,
    userViewData, // Datos
    setUserViewData,
    userViewError, // Errores
    setUserViewError,
  } = useContext(UserContext); // Mantengo los datos del usuario seleccionado en la lista de usuarios

  useEffect(() => {
    if (userViewIsLoading) {
      getUser(idUser)
        .then((res) => {
          // Si la petición se ha ejecutado correctamente.
          if (res.status === 200) {
            setUserViewData(res.data); // Guardar datos.
            if (res.data.error) {
              setUserViewError(res.data.error); // Guardar error.
            }
          } else {
            setUserViewError("Hubo un error al mostrar los datos del usuario."); // Guardar error.
          }

          setUserViewIsLoading(false); // Cambiar el estado, ya tenemos los datos o el mensaje de error.
        })
        .catch(() => {
          setUserViewError("Hubo un error al realizar la solicitud."); // Almacenar error
          setUserViewIsLoading(false); // Cambiar el estado, puesto que ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userViewIsLoading]);

  // Cargando datos..
  if (userViewIsLoading) {
    return <Loading />;
  }

  // Mensajes de error
  if (userViewError) {
    return (
      <Error
        error={userViewError}
        actions={() => {
          if (renderingMode === "vet") {
            navigate("/dashboard/users/" + idUser);
          } else if (renderingMode === "client") {
            navigate("/dashboard/profile");
          }
        }}
      />
    );
  }

  // Perfil de usuario
  return (
    <>
      <Stack direction="horizontal" gap="4">
        <Image
          className="border"
          width="200px"
          height="200px"
          src={userViewData.imagen ? userViewData.imagen : defaultUserAvatar}
          alt="Imagen de usuario"
          roundedCircle
        />

        <Container className="fs-5">
          <Row>
            <Col>ID:</Col>
            <Col>{userViewData.idUsuario}</Col>
          </Row>
          <Row>
            <Col>Nombre:</Col>
            <Col>{userViewData.nombre + " " + userViewData.apellidos}</Col>
          </Row>
          <Row>
            <Col>DNI:</Col>
            <Col>{userViewData.dni}</Col>
          </Row>
          <Row>
            <Col>Teléfono:</Col>
            <Col>{userViewData.telefono}</Col>
          </Row>
          <Row>
            <Col>Email:</Col>
            <Col>{userViewData.email}</Col>
          </Row>
          <Row>
            <Col>Localidad:</Col>
            <Col>{userViewData.localidad}</Col>
          </Row>
          <Row>
            <Col>Provincia:</Col>
            <Col>{userViewData.provincia}</Col>
          </Row>
          <Row>
            <Col>Código postal:</Col>
            <Col>{userViewData.cPostal}</Col>
          </Row>
          <Row>
            <Col>Fecha alta:</Col>
            <Col>{new Date(userViewData.fechaAlta).toLocaleDateString()}</Col>
          </Row>
          <Row>
            <Col>Fecha nacimiento:</Col>
            <Col>
              {userViewData.fechaNacimiento
                ? new Date(userViewData.fechaNacimiento).toLocaleDateString()
                : null}
            </Col>
          </Row>
          <Row>
            <Col>Tipo de usuario:</Col>
            <Col>{userViewData.rolUsuario ? "Veterinario" : "Cliente"}</Col>
          </Row>
        </Container>
      </Stack>
      <div className="d-flex">
        <Button
          className="ms-auto"
          onClick={() => {
            if (renderingMode === "vet") {
              navigate("/dashboard/users/" + idUser + "/edit");
            } else if (renderingMode === "client") {
              navigate("/dashboard/profile/edit");
            }
          }}
        >
          Editar
        </Button>
      </div>
    </>
  );
}

export default UserView;
