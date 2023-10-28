import { Router } from "express";
import { getAllVaccines, getVaccineById, editVaccine, deleteVaccine, newVaccine } from "../controllers/vaccines.controller.js";

const vaccinesRoute = Router();

vaccinesRoute.get("/api/vaccines", getAllVaccines);
vaccinesRoute.get("/api/vaccines/:id", getVaccineById);
vaccinesRoute.patch("/api/vaccines", editVaccine);
vaccinesRoute.delete("/api/vaccines/:id", deleteVaccine);
vaccinesRoute.post("/api/vaccines", newVaccine);

export default vaccinesRoute;
