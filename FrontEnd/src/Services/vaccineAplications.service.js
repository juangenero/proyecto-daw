import { clientAxios } from "../Utils/axios-instances.js";

// Obtener todas las consultas por ID de mascota
export async function getAllVaccineAplicationsById(idMascota) {
  return await clientAxios.get("/vaccineApplication/" + idMascota);
}

// Crear aplicación de vacuna
export async function newVaccineApplication(vaccineAplication) {
  return await clientAxios.post("/vaccineApplication/", vaccineAplication);
}

// Eliminar aplicación de vacuna
export async function deleteVaccineApplication(vaccineAplication){
  return await clientAxios.post("/deleteVaccineApplication/", vaccineAplication);
}