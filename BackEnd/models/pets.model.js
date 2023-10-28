import { connection } from "../configs/db.js";
import { DB_NAME } from "../configs/db.js";

// Obtener todas las mascotas
export async function getAllPetsDB() {
  try {
    const [rows] = await connection.query(
      `SELECT idMascota, idUsuario,(select concat(USUARIOS.nombre ,' ', USUARIOS.apellidos ) FROM USUARIOS where USUARIOS.idUsuario = MASCOTAS.idUsuario) as dueno , nombre, especie, raza, sexo, peso,(select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta,(select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, altura, comentarios, imagen, (SELECT max(fecha) FROM ${DB_NAME}.CONSULTAS where CONSULTAS.idMascota = MASCOTAS.idMascota) as ultimaConsulta FROM MASCOTAS;`
    );
    return rows;
  } catch (error) {
    console.error(error); // Muestra el error por consola
    return null;
  }
}

// Obtener ID y nombre de todas las mascotas
export async function getPetsNamesDB(){
  try {
    const [rows] = await connection.query(
      "SELECT idMascota, nombre FROM MASCOTAS;"
    );
    return rows;
  } catch (error) {
    console.error(error); // Muestra el error por consola
    return null;
  }
}

// Obtener las mascotas de un usuario
export async function getPetsOfUserDB(idUser) {
  try {
    const [rows] = await connection.query(
      `SELECT idMascota, idUsuario, nombre, especie, raza, sexo, peso,(select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta,(select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, altura, comentarios, imagen, (SELECT max(fecha) FROM ${DB_NAME}.CONSULTAS where CONSULTAS.idMascota = MASCOTAS.idMascota) as ultimaConsulta FROM MASCOTAS WHERE idUsuario = ?;`,
      [idUser]
    );

    if (rows[0]) return rows; // Si existen resultados los devuelve
    else return false;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

// Obtener mascota por ID
export async function getPetByIdDB(idPet) {
  try {
    const [row] = await connection.query(
      "SELECT idMascota, idUsuario, (select concat(USUARIOS.nombre ,' ', USUARIOS.apellidos ) FROM USUARIOS WHERE USUARIOS.idUsuario = MASCOTAS.idUsuario) as dueno, nombre, especie, raza, sexo, peso, (select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta, (select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, altura, comentarios, imagen FROM MASCOTAS WHERE idMascota = ?;",
      [idPet]
    );

    if (row[0]) return row[0];
    else return false;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

// Editar mascota
export async function editPetDB(pet) {
  try {
    // Consulta SQL
    const query =
      "UPDATE MASCOTAS SET idUsuario=?, nombre=?, especie=?, raza=?, sexo=?, peso=?, fechaAlta=?, fechaNacimiento=?, altura=?, comentarios=?, imagen=? WHERE idMascota=?";

    // Parámetros a insertar
    const params = [
      pet.owner,
      pet.name,
      pet.specie,
      pet.race,
      pet.sex,
      pet.weight,
      pet.registerDate,
      pet.dateOfBirth,
      pet.high,
      pet.comments,
      pet.image,
      pet.id,
    ];

    // Ejecución de la consulta
    const [result] = await connection.query(query, params);

    return result;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

// Eliminar mascota
export async function deletePetDB(idPet) {
  try {
    const [rows] = await connection.query("DELETE FROM MASCOTAS WHERE idMascota = ?", [idPet]);
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

// Nueva mascota
export async function newPetDB(pet) {
  try {
    // Consulta SQL
    const query = "INSERT INTO MASCOTAS VALUES (0, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    // Parámetros a insertar
    const params = [
      pet.owner,
      pet.name,
      pet.specie,
      pet.race,
      pet.sex,
      pet.weight,
      pet.registerDate,
      pet.dateOfBirth,
      pet.high,
      pet.comments,
      pet.image,
    ];

    // Ejecución de la consulta
    const [result] = await connection.query(query, params);
    return result;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}