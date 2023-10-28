import React from "react";
import { Alert, Button } from "react-bootstrap";

/**
 * @param {String} error Mensaje de error que debe mostrar.
 * @param {Function} actions Acciones que debe de hacer el botón "Reintentar".
 * @param {Boolean} showButton Para indicar si debe mostrar el botón "Reintentar", si no se indica nada, lo muestra
 * @returns Mensaje de error y botón para reintentar.
 */
function Error({ error, actions = null, showButton = true }) {
  return (
    <>
      <br />
      <div className="d-flex justify-content-center">
        <Alert variant="danger">{error}</Alert>
      </div>
      {showButton ? (
        <div className="d-flex justify-content-center">
          <Button variant="warning" onClick={actions}>
            Reintentar
          </Button>
        </div>
      ) : null}
      <br />
    </>
  );
}

export default Error;
