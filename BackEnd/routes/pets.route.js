import { Router } from "express";
import {
  getAllPets,
  getPetsNames,
  getPetsOfUser,
  getPetById,
  editPet,
  deletePet,
  newPet,
} from "../controllers/pets.controller.js";

const petsRoute = Router();

petsRoute.get("/api/pets", getAllPets);
petsRoute.get("/api/petsNames", getPetsNames);
petsRoute.get("/api/pets/user/:idUser", getPetsOfUser);
petsRoute.get("/api/pets/pet/:idPet", getPetById);
petsRoute.patch("/api/pets", editPet);
petsRoute.delete("/api/pets/:idPet", deletePet);
petsRoute.post("/api/pets", newPet);

export default petsRoute;
