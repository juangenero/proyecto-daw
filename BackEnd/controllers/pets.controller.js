import {
  getAllPetsDB,
  getPetsNamesDB,
  getPetByIdDB,
  getPetsOfUserDB,
  deletePetDB,
  newPetDB,
  editPetDB,
} from "../models/pets.model.js";

// Obtener todas las mascotas
export async function getAllPets(req, res) {
  const pets = await getAllPetsDB(); // Método del modelo
  if (pets) {
    res.json(pets); // Si la consulta se ha ejecutado correctamente, devuelve las mascotas
  } else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Si no, envía un mensaje de error
}

// Obtener el ID y nombre de las mascotas
export async function getPetsNames(req, res) {
  const pets = await getPetsNamesDB();

  // Si la consulta SQL se ha ejecutado correctamente
  if (pets) res.json(pets);
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
}

// Obtener mascotas de un usuario
export async function getPetsOfUser(req, res) {
  const pets = await getPetsOfUserDB(req.params.idUser);

  // Si se ha producido algún error en la consulta SQL
  if (pets === null) res.status(500).json({ error: "Ocurrió un error interno en el servidor." });

  // Si no ha devuelto registros
  else if (!pets) res.json({ error: "No existen mascotas para este usuario." });

  // Si ha devuelto registros
  else res.json(pets);
}

// Obtener mascota por ID
export async function getPetById(req, res) {
  const pet = await getPetByIdDB(req.params.idPet);
  const userId = req.headers["userId"];
  const userRol = req.headers["userRol"];

  // Si ha ocurrido algún error
  if (pet === null) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor." });
  }
  // Si no se ha encontrado la mascota.
  else if (!pet) {
    if (userRol === 0) res.json({ error: "No tiene permisos para ver esta mascota." });
    else res.json({ error: "Mascota no encontrada." }); // Respuesta para los veterinarios.
  }
  // Si se ha encontrado la mascota.
  else {
    // Si un cliente intenta ver una mascota que no es suya
    if (userRol === 0 && userId !== pet.idUsuario) {
      res.json({ error: "No tiene permisos para ver esta mascota." });
    }
    // Si un veterinario intenta ver una mascota
    else res.json(pet);
  }
}

// Editar mascota
export async function editPet(req, res) {
  const result = await editPetDB(req.body);

  // Si ha ocurrido algún error
  if (!result) {
    res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
  } else {
    res.json(result);
  }
}

// Eliminar mascota
export async function deletePet(req, res) {
  const result = await deletePetDB(req.params.idPet); // Método del modelo

  // Si se ha ejecutado la consulta
  if (result) res.json(result); // Devuelve información de la ejecución de dicha consulta
  // Si ha habido algún error en la consulta
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Devuelve un mensaje de error
}

// Nueva mascota
export async function newPet(req, res) {
  const result = await newPetDB(req.body);

  // Si la consulta se ha ejecutado correctamente
  if (result) res.json(result);
  else res.status(500).json({ error: "Ocurrió un error interno en el servidor" }); // Devuelve un mensaje de error
}
