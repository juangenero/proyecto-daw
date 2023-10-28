import React, { useContext } from "react";
import { useEffect } from "react";
import { Alert, Button, Card, Stack } from "react-bootstrap";
import Error from "../../../Components/Utils/Error";
import Loading from "../../../Components/Utils/Loading";
import { AppContext } from "../../../Context/AppContext";
import { PetsContext } from "../../../Context/PetsContext";
import defaultPetAvatar from "../../../Img/defaultPetAvatar.png";
import { getPetsOfUser } from "../../../Services/pets.service";
import { useNavigate } from "react-router-dom";
import NewPetModal from "./Modals/NewPetModal";
import DeletePetModal from "./Modals/DeletePetModal";

function PetsListClientView() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    petsListIsLoading,
    setPetsListIsLoading,
    petsListData,
    setPetsListData,
    petsListError,
    setPetsListError,
    setNewPetModal,
    setSelectedPet,
    setPetDeleteModalShow,
  } = useContext(PetsContext);

  useEffect(() => {
    if (petsListIsLoading) {
      getPetsOfUser(user.id)
        .then((res) => {
          if (res.status === 200) {
            if (!res.data.error) {
              setPetsListData(res.data);
            }
          } else {
            setPetsListError("Hubo un error al procesar la solicitud.");
          }

          setPetsListIsLoading(false);
        })
        .catch((err) => {
          setPetsListError("Hubo un error al realizar la solicitud."); // Guardar error
          setPetsListIsLoading(false); // Cambiar estado, ocurrió un error
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petsListIsLoading]);

  // Si está cargando
  if (petsListIsLoading) {
    return <Loading />;
  }

  // Si hay errores
  if (petsListError) {
    return (
      <Error
        error={petsListError}
        actions={() => {
          navigate("/dashboard/pets");
        }}
      />
    );
  }

  return (
    <>
      <Button
        className="mb-2 ms-1"
        onClick={() => {
          setNewPetModal(true);
        }}
      >
        Nueva mascota
      </Button>

      {!petsListData ? (
        <div className="d-flex justify-content-center">
          <Alert className="w-25 text-center">Aún no tienes mascotas registradas.</Alert>
        </div>
      ) : (
        <div>
          <Stack direction="horizontal">
            {petsListData.map((pet) => (
              <Card key={pet.idMascota} style={{ width: "18rem" }} className="mx-1">
                <Card.Img variant="top" src={pet.imagen ? pet.imagen : defaultPetAvatar} />
                <Card.Body>
                  <Card.Title>{pet.nombre}</Card.Title>
                  <Card.Text>
                    Raza: {pet.raza}
                    <br />
                    Sexo: {pet.sexo} <br />
                    Fecha nacimiento: {new Date(pet.fechaNacimiento).toLocaleDateString()}
                    <br />
                    Última consulta:{" "}
                    {pet.ultimaConsulta ? new Date(pet.ultimaConsulta).toLocaleDateString() : "-"}
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="ms-1 mb-1"
                    onClick={() => {
                      navigate("/dashboard/pets/" + pet.idMascota);
                    }}
                  >
                    Ver
                  </Button>
                  <Button
                    variant="primary"
                    className="ms-1 mb-1"
                    onClick={() => {
                      navigate("/dashboard/pets/" + pet.idMascota + "/edit");
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="primary"
                    className="ms-1 mb-1"
                    onClick={() => {
                      setSelectedPet({ nombre: pet.nombre, idMascota: pet.idMascota });
                      setPetDeleteModalShow(true);
                    }}
                  >
                    Eliminar
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Stack>
        </div>
      )}
      <DeletePetModal />
      <NewPetModal />
    </>
  );
}

export default PetsListClientView;
