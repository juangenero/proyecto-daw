import express from "express"; // Importar servidor
import "./configs/env.js"; // Importar módulo para usar variables de entorno (archivo .env)
import cors from "cors"; // Habilita las CORS en el servidor para habilitar peticiones desde un cliente
import morgan from "morgan"; // Importar middleware para analizar cabeceras HTTP (Usado para el desarrollo)
import validateAuth from "./middlewares/validateAuth.js"; // Importar Middlewares

// Importar enrutadores
import loginRoute from "./routes/login.route.js";
import usersRoute from "./routes/users.route.js";
import petsRoute from "./routes/pets.route.js";
import consultsRoute from "./routes/consults.route.js";
import vaccinesRoute from "./routes/vaccines.route.js";
import vaccineApplicationRoute from "./routes/vaccineApplications.route.js";

const app = express(); // Crear servidor

// Middlewares
app.use(cors()); // Permitir CORS en las peticiones
app.use(morgan(":method :url :status :req[header] :res[header]")); // Analizar cabeceras (se muestra cada solicitud en la consola de la API)
app.use(express.json({ limit: "3 mb" })); // Permite procesar archivos JSON de 3 MB como máximo

// Enrutadores
app.use(loginRoute);
app.use(validateAuth); // La rutas posteriores a este middleware necesitarán un usuario autenticado
app.use(usersRoute);
app.use(petsRoute);
app.use(consultsRoute);
app.use(vaccinesRoute);
app.use(vaccineApplicationRoute);

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
