import { Router } from "express";
import {
  getAllVaccineAplications,
  getAllVaccineAplicationsById,
  newVaccineApplication,
  deleteVaccineApplication,
} from "../controllers/vaccineApplications.controller.js";

const vaccineApplicationRoute = Router();

vaccineApplicationRoute.get("/api/vaccineApplication", getAllVaccineAplications);
vaccineApplicationRoute.get("/api/vaccineApplication/:idMascota", getAllVaccineAplicationsById);
vaccineApplicationRoute.post("/api/vaccineApplication", newVaccineApplication);
vaccineApplicationRoute.post("/api/deleteVaccineApplication", deleteVaccineApplication);

export default vaccineApplicationRoute;
