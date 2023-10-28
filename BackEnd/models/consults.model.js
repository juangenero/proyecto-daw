import { connection } from "../configs/db.js";

// Obtener consultas
export async function getConsultsDB() {
  try {
    const [rows] = await connection.query(
      "SELECT CONSULTAS.idConsulta, CONSULTAS.idMascota, MASCOTAS.nombre as nombreMascota, USUARIOS.idUsuario as idPropietario, USUARIOS.nombre as nombrePropietario, USUARIOS.apellidos as apellidosPropietario, CONSULTAS.fecha, CONSULTAS.hora, CONSULTAS.diagnostico, CONSULTAS.tratamiento, CONSULTAS.observaciones FROM CONSULTAS, MASCOTAS, USUARIOS WHERE CONSULTAS.idMascota = MASCOTAS.idMascota AND MASCOTAS.idUsuario = USUARIOS.idUsuario;"
    );

    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

// Obtener consultas por ID
export async function getConsultsByIdDB(idConsulta) {
  try {
    const [rows] = await connection.query(
      "SELECT CONSULTAS.idConsulta, CONSULTAS.idMascota, MASCOTAS.nombre as 'nombreMascota', CONSULTAS.idUsuario, fecha, hora, diagnostico, tratamiento, observaciones FROM CONSULTAS, MASCOTAS WHERE CONSULTAS.idMascota = MASCOTAS.idMascota AND CONSULTAS.idConsulta = ?;",
      [idConsulta]
    );

    if (rows[0]) return rows[0]; // Devuelve la consulta si existe
    else return false; // Devuelve false si no ha encontrado nada
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null; // Devuelve null si ha habido algún error
  }
}

// Obtener consultas de una mascota
export async function getConsultsOfPetDB(idMascota) {
  try {
    const [rows] = await connection.query(
      "SELECT idConsulta, CONSULTAS.idMascota, CONSULTAS.idUsuario, fecha, hora, diagnostico, tratamiento, observaciones FROM CONSULTAS WHERE CONSULTAS.idMascota = ? ORDER BY fecha DESC;",
      [idMascota]
    );

    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

// Obtener consultas de las mascotas del usuario
export async function getConsultsPetsOfUserIdDB(idUsuario) {
  try {
    const [rows] = await connection.query(
      "SELECT CONSULTAS.idConsulta, CONSULTAS.idMascota, MASCOTAS.nombre as nombreMascota, USUARIOS.idUsuario as idPropietario, USUARIOS.nombre as nombrePropietario, USUARIOS.apellidos as apellidosPropietario, CONSULTAS.fecha, CONSULTAS.hora, CONSULTAS.diagnostico, CONSULTAS.tratamiento, CONSULTAS.observaciones FROM CONSULTAS, MASCOTAS, USUARIOS WHERE CONSULTAS.idMascota = MASCOTAS.idMascota AND MASCOTAS.idUsuario = USUARIOS.idUsuario AND USUARIOS.idUsuario = ?;",
      [idUsuario]
    );

    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

// Nueva consulta
export async function newConsultDB(consult) {
  try {
    // Ejecución de la consulta
    const [result] = await connection.query(
      "INSERT INTO CONSULTAS VALUES (0, ?, ?, ?, ?, ?, ?, ?)",
      [
        consult.idMascota,
        consult.idUsuario,
        consult.fecha,
        consult.hora,
        consult.diagnostico,
        consult.tratamiento,
        consult.observaciones,
      ]
    );

    return result;
  } catch (error) {
    console.error(error); // Muestra el error por consola
    return null;
  }
}

// Editar consulta
export async function editConsultDB(consult) {
  try {
    // Ejecución de la consulta
    const [result] = await connection.query(
      "UPDATE CONSULTAS SET idMascota=?, idUsuario=?, fecha=?, hora=?, diagnostico=?, tratamiento=?, observaciones=? WHERE idConsulta=?;",
      [
        consult.idMascota,
        consult.idUsuario,
        consult.fecha,
        consult.hora,
        consult.diagnostico,
        consult.tratamiento,
        consult.observaciones,
        consult.idConsulta,
      ]
    );

    return result;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

// Eliminar consulta
export async function deleteConsultByIdDB(idConsulta) {
  try {
    const [rows] = await connection.query(
      "DELETE FROM CONSULTAS WHERE idConsulta = ?",
      [idConsulta]
    );
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}
