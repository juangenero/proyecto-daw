import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Nav, Navbar, Stack } from "react-bootstrap";
import { AppContext } from "../../Context/AppContext";
import { logout } from "../../Services/auth.service.js";

// El menú de navegación del dashboard, se renderiza de forma condicional según el usuario que haya iniciado sesión.
function DashboardNav() {
  const { user, setUser } = useContext(AppContext); // Estado del usuario
  const navigate = useNavigate(); // Para redirigir en la opción de cerrar sesión.

  return (
    <Navbar>
      <Stack>
        <Nav>
          {user.rol ? (
            <Nav.Link as={Link} to="users" className="text-white">
              Usuarios
            </Nav.Link>
          ) : (
            <Nav.Link as={Link} to="profile" className="text-white">
              Perfil
            </Nav.Link>
          )}

          <Nav.Link as={Link} to="pets" className="text-white">
            Mascotas
          </Nav.Link>

          <Nav.Link as={Link} to="consults" className="text-white">
            Consultas
          </Nav.Link>

          {user.rol ? (
            <Nav.Link as={Link} to="vaccines" className="text-white">
              Vacunas
            </Nav.Link>
          ) : undefined}

          <Nav.Link as={Link} to="help" className="text-white ms-auto">
            Ayuda
          </Nav.Link>

          <Nav.Link
            onClick={() => logout(setUser, navigate)}
            className="text-white"
          >
            Cerrar sesión
          </Nav.Link>
        </Nav>
      </Stack>
    </Navbar>
  );
}

export default DashboardNav;
