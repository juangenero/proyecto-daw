import {
  getConsultsOfPetDB,
  getConsultsDB,
  getConsultsPetsOfUserIdDB,
  getConsultsByIdDB,
  newConsultDB,
  editConsultDB,
  deleteConsultByIdDB,
} from "../models/consults.model.js";

// Obtener consultas
export async function getConsults(req, res) {
  const consults = await getConsultsDB(); // Método del modelo

  // Si en la consulta SQL se ha producido algún error
  if (consults == null) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  } else {
    res.json(consults);
  }
}

// Obtener consultas por ID
export async function getConsultsById(req, res) {
  const consult = await getConsultsByIdDB(req.params.idConsulta);

  // Si ha devuelvo alguna consulta..
  if (consult) res.json(consult);
  // Si no ha devuelto ninguna consulta..
  else {
    // Si no se ha encontrado la consulta
    if (consult === false) res.json({ error: "Consulta no encontrada" });
    // Si ha habido algún error en la sentencia SQL
    else
      res
        .status(500)
        .json({ error: "Ocurrió un error interno en el servidor" });
  }
}

// Obtener consultas de una mascota
export async function getConsultsOfPet(req, res) {
  const consults = await getConsultsOfPetDB(req.params.idMascota); // Método del modelo

  // Si en la consulta SQL se ha producido algún error
  if (consults == null) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  } else {
    res.json(consults);
  }
}

// Obtener consultas de las mascota de un usuario
export async function getConsultsPetsOfUserId(req, res) {
  const consults = await getConsultsPetsOfUserIdDB(req.params.idUsuario); // Método del modelo

  // Si en la consulta SQL se ha producido algún error
  if (consults == null) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  } else {
    res.json(consults);
  }
}

// Nueva consulta
export async function newConsult(req, res) {
  const result = await newConsultDB(req.body); // Método del modelo

  // Si se ha ejecutado la consulta SQL
  if (result) res.json(result);
  // Devuelve información de la ejecución de dicha consulta SQL
  // Si ha habido algún error en la consulta SQL
  else
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Devuelve un mensaje de error
}

// Editar consulta
export async function editConsult(req, res) {
  const result = await editConsultDB(req.body);

  // Devuelve información de la ejecución de dicha consulta SQL
  if (result === null) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  } else {
    res.json(result);
  }
}

// Eliminar consulta
export async function deleteConsultById(req, res) {
  const result = await deleteConsultByIdDB(req.params.idConsulta); // Método del modelo

  // Si se ha ejecutado la consulta SQL
  if (result) res.json(result);
  // Devuelve información de la ejecución de dicha consulta SQL
  // Si ha habido algún error en la consulta SQL
  else
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Devuelve un mensaje de error
}
