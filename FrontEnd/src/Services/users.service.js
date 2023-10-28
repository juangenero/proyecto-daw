import { clientAxios } from "../Utils/axios-instances.js";

export async function getAllUsers() {
  return await clientAxios.get("/users");
}

// Obtener todos los usuarios clientes con su ID
export async function getClientUsernames() {
  return await clientAxios.get("/clientUsernames");
}

// Obtener todos los usuarios veterinarios con su ID
export async function getVetUsernames() {
  return await clientAxios.get("/vetUsernames");
}

// Obtener usuario por ID
export async function getUser(id) {
  return await clientAxios.get("/users/" + id);
}

// Editar usuario
export async function editUser(user) {
  return await clientAxios.patch("/users/", user);
}

// Eliminar usuario
export async function deleteUser(id) {
  return await clientAxios.delete("/users/" + id);
}

// Añadir usuario
export async function newUser(user) {
  return await clientAxios.post("/users/", user);
}
