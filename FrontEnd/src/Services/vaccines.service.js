import { clientAxios } from "../Utils/axios-instances.js";

// Obtener todas las vacunas
export async function getAllVaccines() {
  return await clientAxios.get("/vaccines");
}

// Obtener vacuna por ID
export async function getVaccine(id) {
  return await clientAxios.get("/vaccines/" + id);
}

// Editar vacuna
export async function editVaccine(vaccine) {
  return await clientAxios.patch("/vaccines/", vaccine);
}

// Eliminar vacuna por ID
export async function deleteVaccine(id) {
  return await clientAxios.delete("/vaccines/" + id);
}

// Añadir vacuna
export async function newVaccine(vaccine) {
  return await clientAxios.post("/vaccines", vaccine);
}
