import Header from "./Components/Header/Header";
import FrontRoutes from "./Routes/FrontRoutes";
import Footer from "./Components/Footer/Footer";

import { LoginContext } from "./Context/LoginContext";

// Bootstrap
import { Stack } from "react-bootstrap";
import { useContext, useEffect } from "react";

function App() {
  const { setModalShow } = useContext(LoginContext);

  useEffect(() => {
    // Si llega al inicio con alguna URL almacenada previamente (es decir, redirigido porque no estaba logueado), muesta el modal de login
    if (window.sessionStorage.getItem("landingURL")) {
      setModalShow(true);
    }
  }, [setModalShow]);

  // Monta la la página principal
  return (
    <Stack className="col-md-8 mx-auto">
      <Header />
      <FrontRoutes />
      <Footer />
    </Stack>
  );
}

export default App;
