import { clientAxios } from "../Utils/axios-instances.js";

// Obtener consultas
export async function getConsults() {
  return await clientAxios.get("/consults");
}

// Obtener consultas por ID
export async function getConsultsById(idConsulta) {
  return await clientAxios.get("/consults/" + idConsulta);
}

// Obtener consultas de una mascota
export async function getConsultsOfPet(idPet) {
  return await clientAxios.get("/consults/pet/" + idPet);
}

// Obtener consultas de las mascotas de un usuario
export async function getConsultsPetsOfUserId(idUsuario) {
  return await clientAxios.get("/consults/pets/user/" + idUsuario);
}

// Nueva consulta
export async function newConsult(consult) {
  return await clientAxios.post("/consults", consult);
}

// Editar consulta
export async function editConsult(consult) {
  return await clientAxios.patch("/consults", consult);
}

// Eliminar consulta
export async function deleteConsult(idConsult) {
  return await clientAxios.delete("/consults/" + idConsult);
}
