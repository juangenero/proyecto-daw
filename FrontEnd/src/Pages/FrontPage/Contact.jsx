import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Contact = () => {
  return (
    <Container fluid>
      <h1 className="text-center display-4 fw-bold mt-4 mb-4">Contacto</h1>
      <Row className="justify-content-center">
        <Col md={4} className="text-center bg-warning text-dark p-4">
          <h2 className="h4">Teléfono</h2>
          <p>No dudes en llamarnos.</p>
          <p>666 666 666</p>
        </Col>
        <Col md={4} className="text-center bg-primary text-white p-4">
          <h2 className="h4">Mail</h2>
          <p>
            También nos puedes escribir un mail, contándonos tu caso o
            solicitando cualquier información.
          </p>
          <p>hola@petdoctor.es</p>
        </Col>
        <Col md={4} className="text-center bg-success text-white p-4">
          <h2 className="h4">Cita previa</h2>
          <p>
            Valoramos a tu mascota de forma exhaustiva para determinar el
            tratamiento más adecuado para su cuidado.
          </p>
        </Col>
        <Col md={4} className="text-center bg-danger text-white p-4">
          <h2 className="h4">Horario</h2>
          <p>
            De Lunes a Viernes de 9:00 a 14:00 y de 17:00 a 20:00 <br /> Y Sábados
            de 9:00 a 14:00
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
