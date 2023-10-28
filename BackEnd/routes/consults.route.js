import { Router } from "express";
import {
  getConsultsOfPet,
  getConsults,
  getConsultsPetsOfUserId,
  getConsultsById,
  newConsult,
  editConsult,
  deleteConsultById,
} from "../controllers/consults.controller.js";

const consultsRoute = Router();

consultsRoute.get("/api/consults", getConsults);
consultsRoute.get("/api/consults/:idConsulta", getConsultsById);
consultsRoute.get("/api/consults/pet/:idMascota", getConsultsOfPet);
consultsRoute.get("/api/consults/pets/user/:idUsuario", getConsultsPetsOfUserId);
consultsRoute.post("/api/consults", newConsult);
consultsRoute.patch("/api/consults", editConsult);
consultsRoute.delete("/api/consults/:idConsulta", deleteConsultById);

export default consultsRoute;
