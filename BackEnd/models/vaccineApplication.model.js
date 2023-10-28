import { connection } from "../configs/db.js";

/** Obtener aplicaciones de vacunas */
export async function getAllVaccineAplicationsDB() {
  try {
    const [rows] = await connection.query("SELECT * FROM APLICA;");
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/** Obtener aplicaciones de vacunas de una mascota */
export async function getAllVaccineAplicationsByIdDB(idMascota) {
  try {
    const [row] = await connection.query(
      "SELECT APLICA.idMascota, APLICA.idVacuna, VACUNAS.vacuna, VACUNAS.observaciones, APLICA.fecha FROM APLICA, VACUNAS WHERE VACUNAS.idVacuna = APLICA.idVacuna AND APLICA.idMascota = ?;",
      [idMascota]
    );

    return row;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/** Añadir aplicación de vacuna */
export async function newVaccineApplicationDB(idMascota, idVacuna, fecha) {
  try {
    const [rows] = await connection.query("INSERT INTO APLICA VALUES (?, ?, ?);", [
      idMascota,
      idVacuna,
      fecha,
    ]);
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    if (error.code == "ER_DUP_ENTRY") return "DUPLICATE_ENTRY"; // Si la clave primaria (idMascota + idVacuna + fecha, está duplicada)
    return null;
  }
}

/** Eliminar aplicación de vacuna */
export async function deleteVaccineApplicationDB(idMascota, idVacuna, fecha) {
  try {
    const [rows] = await connection.query(
      "DELETE FROM APLICA WHERE idMascota=? AND idVacuna=? AND fecha=?;",
      [idMascota, idVacuna, fecha]
    );
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}
