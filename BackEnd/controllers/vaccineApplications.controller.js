import {
  getAllVaccineAplicationsDB,
  getAllVaccineAplicationsByIdDB,
  newVaccineApplicationDB,
  deleteVaccineApplicationDB,
} from "../models/vaccineApplication.model.js";

/** Obtener aplicaciones de vacunas */
export async function getAllVaccineAplications(req, res) {
  const vaccineAplications = await getAllVaccineAplicationsDB();

  // Si se a ejecutado correctamente la consulta SQL
  if (vaccineAplications) {
    res.json(vaccineAplications);
  } else res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
}

/** Obtener aplicaciones de vacuna de una mascota */
export async function getAllVaccineAplicationsById(req, res) {
  const vaccineAplications = await getAllVaccineAplicationsByIdDB(req.params.idMascota);

  // Si no se a ejecutado correctamente la consulta SQL
  if (vaccineAplications === null) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  } else {
    res.json(vaccineAplications);
  }
}

/** Añadir aplicación de vacuna a una mascota */
export async function newVaccineApplication(req, res) {
  const vaccineApplication = await newVaccineApplicationDB(
    req.body.idMascota,
    req.body.idVacuna,
    req.body.fecha
  ); // Método del modelo

  // Si la consulta que se intenta añadir ya existe con las 3 claves primarias
  if (vaccineApplication == "DUPLICATE_ENTRY") {
    res.json({ error: "Ya existe esta vacuna aplicada a la mascota en esta fecha." }); // Si la entrada está duplicada, envía el  error al cliente
  } else if (vaccineApplication) {
    res.json(vaccineApplication); // Si la consulta se ha ejecutado correctamente, devuelve el resultado de la consulta
  } else {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
  }
}

/** Añadir aplicación de vacuna a una mascota */
export async function deleteVaccineApplication(req, res) {
  const vaccineApplication = await deleteVaccineApplicationDB(
    req.body.idMascota,
    req.body.idVacuna,
    req.body.fecha
  ); // Método del modelo

  // Si la consulta se a ejecutado correctamente.
  if (vaccineApplication) {
    res.json(vaccineApplication); // Si la consulta se ha ejecutado correctamente, devuelve el resultado de la consulta
  } else {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
  }
}
