import { Image } from "react-bootstrap";
import backgroundImage from "../../Img/FrontPage/background-image-services.jpg";

const Home = () => {
  return (
    <>
      <Image src={backgroundImage} fluid />

      <h1 className="text-center fs-1 fw-bold mt-4 mb-4">
        Bienvenido a Pet Doctor, tu clínica veterinaria en Sevilla.
      </h1>

      <p className="fs-4">
        Ofrecemos una amplia variedad de servicios con los que puede resolver y
        prevenir cualquier problema relacionado con tu mascota. Contamos con un
        equipo de veterinarios cualificados para atender a su animal de compañía
        las 24 horas del día.
      </p>
    </>
  );
};

export default Home;
