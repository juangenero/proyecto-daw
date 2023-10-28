import { Router } from "express";
import { login } from "../controllers/login.controller.js";

const loginRoute = Router();

loginRoute.use("/api/login", login);

export default loginRoute;
