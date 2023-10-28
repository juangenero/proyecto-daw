import React, { useContext } from "react";
import { AppContext } from "../../../Context/AppContext";
import { Button } from "react-bootstrap";
import { saveAs } from "file-saver"; // Librería para permitir descargar archivos
import pdfClientes from "../../../Files/pdfClientes.pdf";
import pdfVeterinarios from "../../../Files/pdfVeterinarios.pdf";
import pdfInstalacion from "../../../Files/pdfInstalacion.pdf";

function Help() {
  const { user } = useContext(AppContext);

  return (
    <>
      <h1 className="text-center fs-2">Guía de uso de Pet Doctor</h1>
      <div className="text-center">
        {user.rol === 0 ? (
          // Se muestra a los clientes
          <>
            <p className="fs-5">
              Hemos elaborado un PDF de ayuda para nuestros clientes!
            </p>
            <Button
              onClick={() => saveAs(pdfClientes, "Ayuda para clientes.pdf")}
            >
              Descargar PDF (Guía de uso)
            </Button>
          </>
        ) : (
          // Se muestra a los veterinarios
          <>
            <p className="fs-5">
              Hemos elaborado un PDF de ayuda para nuestros veterinarios!
            </p>
            <Button
              onClick={() =>
                saveAs(pdfVeterinarios, "Ayuda para veterinarios.pdf")
              }
            >
              Descargar PDF (Guía de uso)
            </Button>

            <p className="fs-5 mt-3">
              Si la ayuda que necesitas es para instalar la aplicación, descarga
              esta otra guía elaborada para los técnicos informáticos de la
              clínica!
            </p>
            <Button
              onClick={() =>
                saveAs(pdfInstalacion, "Ayuda para la instalación.pdf")
              }
            >
              Descargar PDF (Instalación)
            </Button>
          </>
        )}
      </div>
    </>
  );
}

export default Help;
