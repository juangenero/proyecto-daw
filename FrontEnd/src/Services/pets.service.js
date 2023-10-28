import { clientAxios } from "../Utils/axios-instances.js";

// Obtener todas las mascotas
export async function getAllPets() {
  return await clientAxios.get("/pets");
}

// Obtener nombres de las mascotas con su ID
export async function getPetsNames() {
  return await clientAxios.get("/petsNames");
}

// Obtener las mascotas de un usuario
export async function getPetsOfUser(idUser) {
  return await clientAxios.get("/pets/user/" + idUser);
}

// Obtener mascota por ID
export async function getPetById(idPet) {
  return await clientAxios.get("/pets/pet/" + idPet);
}

// Editar mascota
export async function editPet(pet) {
  return await clientAxios.patch("/pets", pet);
}

// Eliminar mascota
export async function deletePet(idPet) {
  return await clientAxios.delete("/pets/" + idPet);
}

// Añadir mascota
export async function newPet(idPet) {
  return await clientAxios.post("/pets", idPet);
}
