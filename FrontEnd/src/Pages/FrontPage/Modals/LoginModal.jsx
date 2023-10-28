import { Modal, Form, FloatingLabel, Button, Spinner, Alert } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, decodeJWT, setToken } from "../../../Services/auth.service.js";
import { AppContext } from "../../../Context/AppContext.jsx"; // Contexto de la aplicación
import { LoginContext } from "../../../Context/LoginContext.jsx"; // Contexto del login

export default function LoginModal(props) {
  const { setUser } = useContext(AppContext); // Estado del usuario
  const { modalShow, setModalShow } = useContext(LoginContext); // Estado del modal para el login
  const [username, setUsername] = useState(""); // Estado del campo usuario
  const [password, setPassword] = useState(""); // Estado del campo contraseña
  const [isLoading, setIsLoading] = useState(false); // Estado para saber si ha terminado la solicitud de login
  const [error, setError] = useState(null); // Estado del error al hacer login
  const navigate = useNavigate(); // Método para redirigir a otra ruta

  // Efecto para intentar realizar el login cuando se pulsa el botón de Aceptar
  useEffect(() => {
    // Si se ha pulsado aceptar (isLoading es verdadero)
    if (isLoading) {
      // Enviar petición de login a la API
      login(username, password)
        .then((res) => {
          // Si el servidor ha devuelto un token, lo almacena en localStorage
          if (res.data.token) {
            setToken(res.data.token); // Guarda el token en local store
            setUser(decodeJWT()); // Actualizo el estado del usuario para que tenga acceso a Dashboard
            setIsLoading(false); // Deja de cargar la petición de login
            setModalShow(false); // Oculta la ventana de login

            // Si ha iniciado sesión tras haber visitado una ruta protegida
            if (window.sessionStorage.getItem("landingURL")) {
              navigate(window.sessionStorage.getItem("landingURL"));
              window.sessionStorage.clear();
            } else {
              navigate("/dashboard/pets");
            }

            // Si no ha devuelto el token, almacena el error
          } else {
            setError(res.data.error);
            setIsLoading(false);
          }
        })
        // Si la petición devuelve un error..
        .catch((err) => {
          setError(
            "Se ha producido un error en la petición de inicio de sesión (" + err.message + ")"
          );
          setIsLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Efecto para resetear el formulario de login cuando se oculta
  useEffect(() => {
    if (!modalShow) {
      setUsername("");
      setPassword("");
      setError(null);
      setIsLoading(false);
      window.sessionStorage.clear();
    }
  }, [modalShow]);

  return (
    <Modal {...props}>
      <Modal.Header className="justify-content-center">
        <h4 className="mb-0">Iniciar sesión</h4>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={(event) => handleSubmit(event)}>
          <FloatingLabel controlId="username" label="Correo" className="mb-3">
            <Form.Control
              type="text"
              placeholder="#"
              name="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </FloatingLabel>

          <FloatingLabel controlId="password" label="Contraseña" className="mb-3">
            <Form.Control
              type="password"
              placeholder="#"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </FloatingLabel>

          {/** Mensaje de error */}
          {error ? <Alert variant="danger">{error}</Alert> : null}

          {/** Botones del formulario de Login */}
          {isLoading ? (
            <Button variant="success" className="me-2" disabled>
              <Spinner animation="grow" size="sm" />
              Aceptar
            </Button>
          ) : (
            <Button type="submit" variant="success" className="me-2">
              Aceptar
            </Button>
          )}
          <Button onClick={props.onHide} variant="danger" className="me-2">
            Cancelar
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );

  // Botón aceptar
  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
  }
}
