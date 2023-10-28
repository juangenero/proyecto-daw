import { connection } from "../configs/db.js";

/**
 * Obtiene un usuario mediante su email.
 * @param {*} email enviado por el cliente en la solicitud.
 * @returns El usuario en formato JSON.
 * @returns "null" si ha ocurrido algún error en la consulta.
 */
export async function getUserByEmailDB(email) {
  try {
    const [rows] = await connection.query(
      "SELECT idUsuario, clave, rolUsuario, nombre, apellidos FROM USUARIOS where email = ?",
      [email]
    );

    return rows[0];
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 * Obtiene todos los usuarios de la base de datos.
 * @returns Array de usuarios o null si se ha producido un error.
 */
export async function getAllUsersDB() {
  try {
    const [rows] = await connection.query(
      "SELECT idUsuario, nombre, apellidos, dni, telefono, email, localidad, provincia, cPostal, (select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta, (select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, rolUsuario, imagen FROM USUARIOS"
    );
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 * Obtiene el ID, nombre y apellidos de todos los usuarios
 * @returns Array de usuarios
 */
export async function getClientUsernamesDB() {
  try {
    const [rows] = await connection.query(
      "SELECT idUsuario, nombre, apellidos FROM USUARIOS WHERE rolUsuario = 0"
    );
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 * Obtiene el ID, nombre y apellidos de todos los usuarios
 * @returns Array de usuarios
 */
export async function getVetUsernamesDB() {
  try {
    const [rows] = await connection.query(
      "SELECT idUsuario, nombre, apellidos FROM USUARIOS WHERE rolUsuario = 1"
    );
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 * Obtiene un usuario mediante su ID.
 * @param {*} id en la URL de la llamada a la API.
 * @returns El usuario en formato JSON.
 * @returns "false" si no se ha encontrado el usuario.
 * @returns "null" si ha ocurrido algún error en la consulta.
 */
export async function getUserByIdDB(id) {
  try {
    // Selecciono todos los datos menos la contraseña
    const [rows] = await connection.query(
      "SELECT idUsuario, nombre, apellidos, dni, telefono, email, localidad, provincia, cPostal, (select date_format(fechaAlta, '%Y-%m-%d')) as fechaAlta, (select date_format(fechaNacimiento, '%Y-%m-%d')) as fechaNacimiento, rolUsuario, imagen FROM USUARIOS where idUsuario = ?",
      [id]
    );

    if (rows[0]) return rows[0];
    else return false;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 *
 * @param {*} user datos del usuario a editar.
 * @returns JSON con los campos duplicados encontrados en la BD.
 * @returns Información de la ejecución de la consulta.
 * @returns Si ha ocurrido algún error en la consulta, devuelve el error.
 */
export async function editUserDB(user) {
  try {
    // Errores de posibles campos que deben ser únicos en la BD.
    const duplicateFields = await findDuplicateFields(user);

    // Si existen errores
    if (Object.keys(duplicateFields.error).length > 0) {
      return duplicateFields; // Devuelve los errores

      // Si NO existen errores
    } else {
      // Si el usuario no ha enviado ninguna contraseña, se almacenará la contraseña actual de la base de datos.
      if (user.password.length < 1) {
        const [pass] = await connection.query("SELECT clave FROM USUARIOS WHERE idUsuario = ?", [
          user.id,
        ]);

        user.password = pass[0].clave;
      }

      // Consulta SQL
      const query =
        "UPDATE USUARIOS SET clave=?, nombre=?, apellidos=?, dni=?, telefono=?, email=?, localidad=?, provincia=?, cPostal=?, fechaNacimiento=?, imagen=? WHERE idUsuario=?";

      // Parámetros a insertar
      const params = [
        user.password,
        user.name,
        user.lastName,
        user.dni,
        user.telephone,
        user.email,
        user.location,
        user.province,
        user.postalCode,
        user.dateOfBirth,
        user.image,
        user.id,
      ];

      // Ejecución de la consulta
      const [result] = await connection.query(query, params);

      return result;
    }
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

/**
 * Elimina el usuario pasado por ID.
 * @param {*} id del usuario a borrar.
 * @returns información de la ejecución de la consulta.
 * @returns "null" si ha ocurrido algún error en la consulta.
 */
export async function deleteUserDB(id) {
  try {
    const [rows] = await connection.query("DELETE FROM USUARIOS WHERE idUsuario = ?", [id]);
    return rows;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}

export async function newUserDB(user) {
  try {
    // Errores de posibles campos que deben ser únicos en la BD.
    const duplicateFields = await findDuplicateFields(user);

    // Si existen errores
    if (Object.keys(duplicateFields.error).length > 0) {
      return duplicateFields; // Devuelve los errores

      // Si NO existen errores
    } else {
      // Consulta SQL
      const query = "INSERT INTO USUARIOS VALUES (0 ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,? ,?)"; // El ID se autoincrementa (aunque ponga 0)

      // Parámetros a insertar
      const params = [
        user.password,
        user.name,
        user.lastName,
        user.dni,
        user.telephone,
        user.email,
        user.location,
        user.province,
        user.postalCode,
        user.registerDate,
        user.dateOfBirth,
        user.rol,
        user.image,
      ];

      // Ejecución de la consulta
      const [result] = await connection.query(query, params);

      return result;
    }
  } catch (error) {
    console.error(error); // Muestra el error por consola
    return null;
  }
}

// - - - - - Funciones auxiliares - - - - -

/**
 * Busca los campos "dni", "teléfono" y "email" del usuario pasado por parámetro y comprueba si ya existe en la BD algún usuario con el mismo valor de alguno de esos 3 campos.
 * @param {Object} userOne Datos del usuario a modificar en la BD.
 * @returns JSON con los errores de los campos duplicados.
 * @returns "null" si ha ocurrido algún error en la consulta.
 */
async function findDuplicateFields(userOne) {
  try {
    // Si el usuario pasado por parametro no tiene campo ID, lo creamos con valor 0 (los IDs de la BD empiezan desde 1)
    if (!userOne.id) userOne.id = 0;

    const [rows] = await connection.query(
      "SELECT dni, telefono, email FROM USUARIOS WHERE idUsuario NOT LIKE ?",
      [userOne.id]
    );

    const errors = { error: {} };

    // Comprobar dni duplicado en la BD.
    rows.map((userSecond) => {
      if (userOne.dni.toLowerCase() == userSecond.dni.toLowerCase()) errors.error.dni = "duplicate";
    });

    // Comprobar teléfono duplicado en la BD.
    rows.map((userSecond) => {
      if (userOne.telephone == userSecond.telefono) errors.error.telephone = "duplicate";
    });

    // Comprobar email duplicado en la BD.
    rows.map((userSecond) => {
      if (userOne.email.toLowerCase() == userSecond.email.toLowerCase())
        errors.error.email = "duplicate";
    });

    return errors;
  } catch (error) {
    console.error(error.message); // Muestra el error por consola
    return null;
  }
}
