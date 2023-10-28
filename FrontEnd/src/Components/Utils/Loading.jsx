import React from "react";
import { Spinner } from "react-bootstrap";

// Mensaje animado de "Cargando.." que se muestra en la mayoría de páginas mientras se muestran los datos de la API.
function Loading() {
  return (
    <>
      <br />
      <div className="d-flex justify-content-center">
        <h1>
          Cargand
          <Spinner animation="border" variant="dark" />
          ...
        </h1>
      </div>
      <br />
    </>
  );
}

export default Loading;
