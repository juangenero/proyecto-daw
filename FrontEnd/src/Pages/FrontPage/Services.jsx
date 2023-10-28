import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Services = () => {
  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
    </div>
      <Container>
        <h1 className="text-center display-4 fw-bold mt-4 mb-4">Nuestros servicios</h1>
        <Row>
          <Col md={4} className="bg-primary text-white p-4">
            <h3 className="h4">Atención Primaria</h3>
            <p>Identificamos y tratamos las necesidades de tu mascota desde la primera consulta.</p>
          </Col>
          <Col md={4} className="bg-secondary text-white p-4">
            <h3 className="h4">Medicina Preventiva</h3>
            <p>Cuidamos de tu mascota para prevenir futuras dolencias.</p>
          </Col>
          <Col md={4} className="bg-info text-white p-4">
            <h3 className="h4">Medicina Interna</h3>
            <p>Valoramos a tu mascota de forma exhaustiva para determinar el tratamiento más adecuado para su cuidado.</p>
          </Col>
          <Col md={4} className="bg-success text-white p-4">
            <h3 className="h4">Consulta Especializada</h3>
            <p>Tratamos de forma especializada cualquier sintomatología específica para dar el mejor cuidado a tu mascota.</p>
          </Col>
          <Col md={4} className="bg-warning text-dark p-4">
            <h3 className="h4">Peluquería e Higiene</h3>
            <p>Nos enorgullecemos de nuestras especialistas certificadas en el cuidado del pelo de tu mascota.</p>
          </Col>
          <Col md={4} className="bg-danger text-white p-4">
            <h3 className="h4">Alimentación Especializada</h3>
            <p>Seleccionamos la mejor alimentación para poder ofrecer el cuidado más adecuado a tu mascota.</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Services;