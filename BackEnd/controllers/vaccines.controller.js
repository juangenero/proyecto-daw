import {
  getAllVaccinesDB,
  getVaccineByIdDB,
  editVaccineDB,
  deleteVaccineDB,
  newVaccineDB,
} from "../models/vaccines.model.js";

/**
 * Obtiene todos las vacuna de la base de datos, responde con:
 * - La lista de vacuna
 * - Mensaje de error interno en el servidor
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function getAllVaccines(req, res) {
  const vaccines = await getAllVaccinesDB(); // Método del modelo
  if (vaccines) {
    res.json(vaccines); // Si la consulta se ha ejecutado correctamente, devuelve los usuarios
  } else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
}

/**
 * Obtiene todas las vacunas de la base de datos, responde con:
 * - La lista de vacunas.
 * - Mensaje de error porque la vacuna no se ha encontrado.
 * - Mensaje de error interno en el servidor.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function getVaccineById(req, res) {
  const vaccine = await getVaccineByIdDB(req.params.id);

  // Si ha devuelvo alguna vacuna..
  if (vaccine) res.json(vaccine);
  // Si no ha devuelto ninguna vacuna..
  else {
    // Si no se ha encontrado la vacuna
    if (vaccine === false) res.json({ error: "Vacuna no encontrada" });
    // Si ha habido algún error en la consulta
    else res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  }
}

/**
 * Edita una vacuna de la base de datos, responde con:
 * - Mensaje de error interno en el servidor.
 * - Mensaje de error (campos duplicados en la BD)
 * - JSON con la información de la ejecución.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function editVaccine(req, res) {
  const result = await editVaccineDB(req.body);

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
 * Elimina una vacuna de la base de datos, responde con:
 * - JSON con la información de la ejecución.
 * - Mensaje de error interno del servidor.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function deleteVaccine(req, res) {
  const result = await deleteVaccineDB(req.params.id); // Método del modelo

  // Si se ha ejecutado la consulta
  if (result) res.json(result); // Devuelve información de la ejecución de dicha consulta
  // Si ha habido algún error en la consulta
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Devuelve un mensaje de error
}

/**
 * Añade una vacuna a la base de datos, responde con:
 * - Mensaje de error interno en el servidor.
 * - Mensaje de error (campos duplicados en la BD)
 * - JSON con la información de la ejecución.
 * @param {*} req Solicitud del cliente.
 * @param {*} res Respuesta del servidor.
 */
export async function newVaccine(req, res) {
  const result = await newVaccineDB(req.body);

  // Si se ha ejecutado la consulta
  if (result) res.json(result); // Devuelve información de la ejecución de dicha consulta
  // Si ha habido algún error en la consulta
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Devuelve un mensaje de error
}
