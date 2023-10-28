import jwt from "jsonwebtoken"; // JWT

/**
 * Middleware a nivel de aplicación que intercepta las solicitudes HTTP y comprueba si existe un token JWT válido en la cabecera.
 * Si existe, deja pasar la petición a los demás enrutadores, si no existe, enviará una respuesta al cliente.
 */
export function validateAuth(req, res, next) {
  const token = req.headers["authorization"];

  // Si existe el token..
  if (token) {
    if (validateJWT(req, token, res)) next(); // Si el token es válido, deja pasar la solicitud del cliente al enrutador que corresponda.
    else res.status(403).send("Invalid Token"); // Si el token no es válido, el middleware envía la respuesta "Invalid Token"

    // Si no existe el token
  } else {
    res.status(403).send("Missing Token"); // Si el token no existe, el middleware envía la respuesta "Missing Token"
  }
}

/**
 * Recibe un token JWT e indica si es o no válido para este servidor.
 * @param {*} token Token JWT
 * @returns true o false
 */
function validateJWT(req, token, res) {
  let result = false;

  jwt.verify(token, process.env.SIGN_JWT, (err, data) => {
    if (data) {
      result = true;
      req.headers["userId"] = data.id; // Añade a la cabecera el ID del JWT recibido.
      req.headers["userRol"] = data.rol; // Añade a la cabecera el ROL del JWT recibido.
    }
  });
  return result;
}

export default validateAuth;
