import Button from "react-bootstrap/Button";
import LoginModal from "../../Pages/FrontPage/Modals/LoginModal"; // Componente login con el modal
import { useContext } from "react"; // Hook de react para el estado del modal
import { useNavigate } from "react-router-dom";

// Contextos de los estados
import { LoginContext } from "../../Context/LoginContext";
import { AppContext } from "../../Context/AppContext";

// Botón de login
export default function PrivateArea() {
  const { modalShow, setModalShow } = useContext(LoginContext);
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      {
        // Renderizado condicional del botón, depende de si el usuario está logueado
        user && user.id ? (
          <Button variant="primary" onClick={() => navigate("/dashboard/pets")}>
            Área personal
          </Button>
        ) : (
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Login
          </Button>
        )
      }

      {/** Llamo a login modal pasandole la propiedad onHide, porque en el "return" del la ventana modal, react no me permite usar el contexto de Login */}
      <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
}
