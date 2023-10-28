import { Router } from "express";
import {
  getAllUsers,
  getClientUsernames,
  getVetUsernames,
  getUser,
  editUser,
  deleteUser,
  newUser,
} from "../controllers/users.controller.js";

const usersRoute = Router();

// Definir enrutadores
usersRoute.get("/api/users", getAllUsers);
usersRoute.get("/api/clientUsernames", getClientUsernames);
usersRoute.get("/api/vetUsernames", getVetUsernames);
usersRoute.get("/api/users/:id", getUser);
usersRoute.patch("/api/users", editUser);
usersRoute.delete("/api/users/:id", deleteUser);
usersRoute.post("/api/users", newUser);

export default usersRoute;
