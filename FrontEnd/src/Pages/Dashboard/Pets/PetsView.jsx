import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PetsContext } from "../../../Context/PetsContext";
import Loading from "../../../Components/Utils/Loading";
import Error from "../../../Components/Utils/Error";
import { getPetById } from "../../../Services/pets.service.js";
import {
  Col,
  Container,
  OverlayTrigger,
  Popover,
  Row,
  Stack,
} from "react-bootstrap";
import defaultPetAvatar from "../../../Img/defaultPetAvatar.png";
import { VaccineContext } from "../../../Context/VaccineContext";
import axios from "axios";
import { getAllVaccineAplicationsById } from "../../../Services/vaccineAplications.service.js";
import { Add, Eye, Info, Trash } from "../../../Components/Utils/Icons";
import { getConsultsOfPet } from "../../../Services/consults.service.js";
import { ConsultContext } from "../../../Context/ConsultsContext";
import { getVetUsernames } from "../../../Services/users.service";
import { useState } from "react";
import { deleteToolTip, addToolTip } from "../../../Components/Utils/ToolTips";
import NewVaccineAplicationsModal from "../VaccineAplications/Modals/NewVaccineAplicationsModal";
import { VaccineAplicationsContext } from "../../../Context/VaccineAplicationsContext";
import { AppContext } from "../../../Context/AppContext";
import DeleteVaccineAplicationsModal from "../VaccineAplications/Modals/DeleteVaccineAplicationsModal";
import { dateFormat } from "../../../Utils/dateFormat";

// Página para el perfil de las mascotas
function PetsView() {
  const location = useLocation();
  const idPet = useParams().idPet; // ID de la mascota de la URL
  const navigate = useNavigate();
  const { user } = useContext(AppContext);
  const [vets, setVets] = useState([]);

  const {
    petsViewIsLoading,
    setPetsViewIsLoading,
    petsViewData,
    setPetsViewData,
    petsViewError,
    setPetsViewError,
    petsConsultSelected,
    setPetsConsultSelected,
  } = useContext(PetsContext);

  // Estado Modal aplicación de vacunas
  const {
    newVaccineAplicationsModal,
    deleteVaccineAplicationsModal,
    setSelectedVaccine,
  } = useContext(VaccineAplicationsContext);

  // Se aprovechan los datos del contexto de vacunas, aplicación de vacunas y consultas para almacenar los datos de la API.
  const { vaccineListData, setVaccineListData } = useContext(VaccineContext);
  const { consultsListData, setConsultsListData } = useContext(ConsultContext);
  const { setNewVaccineAplicationsModal, setDeleteVaccineAplicationsModal } =
    useContext(VaccineAplicationsContext);

  // Cargar perfil mascota
  useEffect(() => {
    if (petsViewIsLoading) {
      // Llamada a la API múltiple
      axios
        .all([
          getPetById(idPet),
          getConsultsOfPet(idPet),
          getAllVaccineAplicationsById(idPet),
        ])
        .then(({ ...res }) => {
          // 1º respuesta de la API (datos mascota)
          if (res[0].status === 200) {
            if (!res[0].data.error)
              setPetsViewData(res[0].data); // Si la API no devuelve errores
            else setPetsViewError(res[0].data.error); // Si la API devuelve errores
          }

          // 2º respuesta de la API (datos consulta)
          if (res[1].status === 200) {
            setConsultsListData(res[1].data); // Almacena los datos

            // Obtiene los nombres de veterinarios
            getVetUsernames()
              .then((res) => {
                setVets(res.data);
              })
              .catch((err) => {
                setPetsViewError("Hubo un error al realizar la solicitud.");
              });

            if (res[1].data[0]) {
              setPetsConsultSelected(res[1].data[0]); // Para seleccionar por defecto la primera consulta
            }
          }

          // 3º respuesta de la API (datos vacuna)
          if (res[2].status === 200) setVaccineListData(res[2].data);

          setPetsViewIsLoading(false);
        })
        // Si alguna de las 3 solicitudes a la API devuelve una promesa en estado "rechazada" no se mostrará el perfil de la mascota ya que los datos del perfil estarían incompletos.
        .catch((...err) => {
          setPetsViewError("Hubo un error al realizar la solicitud."); // Guardar error
          setPetsViewIsLoading(false); // Cambiar estado, ocurrió un error
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petsViewIsLoading]);

  // Actualizar listado de vacunas cuando se añada o elimine una aplicación de vacuna
  useEffect(() => {
    if (!newVaccineAplicationsModal) {
      setPetsViewIsLoading(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVaccineAplicationsModal, deleteVaccineAplicationsModal]);

  if (petsViewIsLoading) {
    return <Loading />;
  }

  if (petsViewError) {
    return (
      <Error
        error={petsViewError}
        actions={() => {
          navigate("/dashboard/pets/" + idPet);
        }}
        // Si el error es de permisos, no muestra el botón
        showButton={
          petsViewError === "No tiene permisos para ver esta mascota."
            ? false
            : true
        }
      />
    );
  }

  return (
    <>
      <Container>
        <Row>
          {/** DATOS DE LA MASCOTA */}
          <Col className="border-end p-2">
            <h3 className="text-center">{petsViewData.nombre}</h3>
            <Container>
              <Row>
                <Col>
                  <Stack>
                    <div>ID Mascota: {petsViewData.idMascota}</div>
                    <div>Dueño: {petsViewData.dueno}</div>
                    <div>Especie: {petsViewData.especie}</div>
                    <div>Raza: {petsViewData.raza}</div>
                    <div>Sexo: {petsViewData.sexo}</div>
                    <div>
                      Fecha de alta:{" "}
                      {new Date(petsViewData.fechaAlta).toLocaleDateString()}
                    </div>
                    <div>
                      Fecha de nacimiento:{" "}
                      {new Date(
                        petsViewData.fechaNacimiento
                      ).toLocaleDateString()}
                    </div>
                    <div>altura: {petsViewData.altura}</div>
                    <div>
                      Comentarios:{" "}
                      {petsViewData.Comentarios
                        ? petsViewData.Comentarios
                        : "-"}
                    </div>
                  </Stack>
                </Col>
                <Col>
                  <Stack gap="2">
                    {/* Imagen de la mascota */}
                    <img
                      src={
                        petsViewData.imagen
                          ? petsViewData.imagen
                          : defaultPetAvatar
                      }
                      alt="Imagen de la mascota"
                      width="120"
                      height="120"
                      className="mt-1"
                    />

                    {/* Código QR */}
                    <img
                      src={
                        "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=" +
                        window.location.host +
                        location.pathname
                      }
                      alt="Código QR"
                      width="120"
                      height="120"
                    />

                      {/** Falta el botón de imprimir la tarjeta de la mascota (únicamente con la sección de datos de la mascota) */}

                  </Stack>
                </Col>
              </Row>
            </Container>
          </Col>

          {/** LISTADO DE CONSULTAS*/}
          <Col className="text-center p-2" md="3" lg="3">
            <h5 className="text-center border-bottom">
              Historial de consultas
            </h5>
            <div className="d-flex justify-content-center">
              <ul className="list-unstyled">
                {consultsListData && consultsListData[0] ? ( // Si existen consultas de la mascota
                  consultsListData.map(
                    (
                      consult // Recorre el array de consultas
                    ) => (
                      <li key={consult.idConsulta}>
                        {/** Icono de un ojo para indicar que consulta se está visualizando */}
                        {petsConsultSelected &&
                        petsConsultSelected.idConsulta ? (
                          <Eye
                            disabled={
                              petsConsultSelected.idConsulta !==
                              consult.idConsulta
                                ? true
                                : false
                            }
                            action={() => {
                              setPetsConsultSelected(consult);
                            }}
                          />
                        ) : null}

                        {/** Fecha de la consulta, también responde al click para cambiar de consulta */}
                        <span
                          onClick={() => {
                            setPetsConsultSelected(consult);
                          }}
                          onMouseOver={() =>
                            (document.body.style.cursor = "pointer")
                          }
                          onMouseLeave={() =>
                            (document.body.style.cursor = "default")
                          }
                        >
                          {new Date(consult.fecha).toLocaleDateString()}
                        </span>
                      </li>
                    )
                  )
                ) : (
                  <li>{petsViewData.nombre} no ha asistido a consulta</li>
                )}
              </ul>
            </div>
          </Col>
        </Row>
        <Row>
          {/** DATOS DE LA CONSULTA SELECCIONADA */}
          <Col className="border-top border-end p-2">
            {petsConsultSelected ? (
              <ul>
                <Container>
                  <Row className="mb-3">
                    <Col>
                      Consulta del{" "}
                      {new Date(petsConsultSelected.fecha).toLocaleDateString()}{" "}
                      a las {petsConsultSelected.hora.substr(0, 5)} atendida por{" "}
                      {
                        /** Si el idUsuario de la consulta existe (puede ser null si se elimina al usuario veterinario que atendió la consulta), comprueba a que nombre corresponde */
                        petsConsultSelected && petsConsultSelected.idUsuario
                          ? vets.map((vet) =>
                              petsConsultSelected.idUsuario === vet.idUsuario
                                ? vet.nombre + " " + vet.apellidos
                                : null
                            )
                          : "Pet Doctor" // Muestra el nombre de la clínica si el usuario veterinario ha sido eliminado
                      }
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <li>
                        <b>Diagnóstico:</b> {petsConsultSelected.diagnostico}
                      </li>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <li>
                        <b>Tratamiento:</b>{" "}
                        {petsConsultSelected.tratamiento
                          ? petsConsultSelected.tratamiento
                          : "Ninguno"}
                      </li>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <li>
                        <b>Observaciones:</b>{" "}
                        {petsConsultSelected.observaciones
                          ? petsConsultSelected.observaciones
                          : "Ninguna"}
                      </li>
                    </Col>
                  </Row>
                </Container>
              </ul>
            ) : null}
          </Col>

          {/** VACUNAS APLICADAS */}
          <Col className="p-2" md="3" lg="3">
            <h5 className="text-center border-bottom">Vacunas</h5>
            <div className="d-flex justify-content-center">
              <ul className="list-unstyled">
                {/* Comprobar si la mascota tiene vacunas */}
                {vaccineListData && vaccineListData[0] ? (
                  // Recorrer el listado de vacunas aplicadas a esta mascota
                  vaccineListData.map((vaccine) => (
                    <li key={vaccine.vacuna + "-" + vaccine.fecha}>
                      {/** Botón info, popover de la información de la vacuna y nombre de la vacuna */}
                      <OverlayTrigger
                        placement="left"
                        overlay={
                          <Popover id={vaccine.vacuna + "-popover"}>
                            <Popover.Header as="h3">
                              Aplicada el{" "}
                              {new Date(vaccine.fecha).toLocaleDateString()}
                            </Popover.Header>
                            <Popover.Body>
                              {vaccine.observaciones
                                ? vaccine.observaciones
                                : "Sin información"}
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <span>
                          <Info /> {vaccine.vacuna + " "}
                        </span>
                      </OverlayTrigger>

                      {/** Botón eliminar vacuna y popover con el texto "eliminar" (sólo para veterinarios) */}
                      {user.rol === 1 ? (
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 50, hide: 150 }}
                          overlay={deleteToolTip}
                        >
                          <span>
                            <Trash
                              action={() => {
                                setSelectedVaccine({
                                  idMascota: idPet,
                                  mascota: petsViewData.nombre,
                                  idVacuna: vaccine.idVacuna,
                                  vacuna: vaccine.vacuna,
                                  fecha: dateFormat(new Date(vaccine.fecha)),
                                });
                                setDeleteVaccineAplicationsModal(true);
                              }}
                            />
                          </span>
                        </OverlayTrigger>
                      ) : null}
                    </li>
                  ))
                ) : (
                  <li>{petsViewData.nombre} no tiene vacunas.</li>
                )}

                {/** Botón para añadir vacunas a la mascota (sólo para veterinarios) */}
                {user.rol === 1 ? (
                  <li className="d-flex justify-content-center mt-2">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 50, hide: 150 }}
                      overlay={addToolTip}
                    >
                      <span>
                        <Add
                          action={() => {
                            setNewVaccineAplicationsModal(true);
                          }}
                        />
                      </span>
                    </OverlayTrigger>
                  </li>
                ) : null}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      {/** Ventanas modales (Se inician en oculto) */}
      <NewVaccineAplicationsModal />
      <DeleteVaccineAplicationsModal />
    </>
  );
}

export default PetsView;
