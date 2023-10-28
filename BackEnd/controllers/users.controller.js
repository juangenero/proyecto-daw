import {
  getAllUsersDB,
  getClientUsernamesDB,
  getVetUsernamesDB,
  getUserByIdDB,
  editUserDB,
  deleteUserDB,
  newUserDB,
} from "../models/users.model.js";

/**
 * Obtiene todos los usuarios de la base de datos, responde con:
 * - La lista de clientes
 * - Mensaje de error interno en el servidor
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function getAllUsers(req, res) {
  const users = await getAllUsersDB(); // Método del modelo
  if (users) res.json(users); // Si la consulta se ha ejecutado correctamente, devuelve los usuarios
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
}

/**
 * Obtiene todos los nombres de usuarios de la base de datos, responde con:
 * - La lista de nombres de usuarios
 * - Mensaje de error interno en el servidor
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function getClientUsernames(req, res) {
  const users = await getClientUsernamesDB(); // Método del modelo
  if (users) res.json(users); // Si la consulta se ha ejecutado correctamente, devuelve los usuarios
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
}

/**
 * Obtiene todos los nombres de usuarios de la base de datos, responde con:
 * - La lista de nombres de veterinarios
 * - Mensaje de error interno en el servidor
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function getVetUsernames(req, res) {
  const users = await getVetUsernamesDB(); // Método del modelo
  if (users) res.json(users); // Si la consulta se ha ejecutado correctamente, devuelve los usuarios
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
}

/**
 * Obtiene todos los usuarios de la base de datos, responde con:
 * - La lista de usuarios.
 * - Mensaje de error porque el usuario no se ha encontrado.
 * - Mensaje de error interno en el servidor.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function getUser(req, res) {
  const user = await getUserByIdDB(req.params.id); // Método del modelo

  if (user === null) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  } else if (!user) {
    res.json({ error: "Usuario no encontrado" });
  } else {
    res.json(user);
  }
}

/**
 * Edita un usuario de la base de datos, responde con:
 * - Mensaje de error interno en el servidor.
 * - Mensaje de error (campos duplicados en la BD)
 * - JSON con la información de la ejecución.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function editUser(req, res) {
  const result = await editUserDB(req.body);

  // Si ha ocurrido algún error en la consulta SQL
  if (result === null) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  } else if (result.error) {
    res.json(result);
  } else {
    res.json(result);
  }
}

/**
 * Elimina un usuario de la base de datos, responde con:
 * - JSON con la información de la ejecución.
 * - Mensaje de error interno del servidor.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function deleteUser(req, res) {
  const result = await deleteUserDB(req.params.id); // Método del modelo

  // Si se ha ejecutado la consulta
  if (result) res.json(result); // Devuelve información de la ejecución de dicha consulta
  // Si ha habido algún error en la consulta
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Devuelve un mensaje de error
}

/**
 * Añade un usuario a la base de datos, responde con:
 * - Mensaje de error interno en el servidor.
 * - Mensaje de error (campos duplicados en la BD)
 * - JSON con la información de la ejecución.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function newUser(req, res) {
  const result = await newUserDB(req.body);

  // Si se ha ejecutado la consulta SQL
  if (result) res.json(result);
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Devuelve un mensaje de error
}