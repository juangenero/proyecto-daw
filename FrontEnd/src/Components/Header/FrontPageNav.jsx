import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

// Menú de navegación de la página principal
export default function FrontPageNav() {
  return (
    <Navbar className="bg-light py-1 rounded">
      <Nav>
        <Nav.Link as={Link} to="/">
          Inicio
        </Nav.Link>
        <Nav.Link as={Link} to="/services">
          Servicios
        </Nav.Link>
        <Nav.Link as={Link} to="/contact">
          Contacto
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}
