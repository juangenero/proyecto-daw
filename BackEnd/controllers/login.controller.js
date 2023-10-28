import jwt from "jsonwebtoken"; // JWT
import { getUserByEmailDB } from "../models/users.model.js";

export async function login(req, res) {
  const email = req.body.username; // En el cliente este valor es "username" pero en el backend es "email"
  const password = req.body.password;
  const sign = process.env.SIGN_JWT || "secret_key"; // Firma del token JWT, por defecto es "secret_key" si no está definida en las variables de entorno.

  // Si el usuario o la contraseña están vacíos
  if (!(email && password)) {
    res.json({ error: "Usuario o contraseña vacíos." });

    // Si los campos del formulario están rellenos
  } else {
    // Obtener el usuario de la base de datos
    const user = await getUserByEmailDB(email);

    // Si el usuario es null, significa que se ha producido un error en la consulta
    if (user === null) {
      res.status(500).json({ error: "Ocurrió un error interno en el servidor" });

      // Si no es null, ha devuelto algún usuario (aunque sea vacío/undefined)
    } else {
      // Si el usuario existe y la contraseña es correcta
      if (user && user.clave === password) {
        // Extraer datos del usuario que se enviarán al cliente
        const payload = {
          id: user.idUsuario,
          rol: user.rolUsuario,
          name: user.nombre,
          lastName: user.apellidos,
        };

        // Firmar token y enviarlo al cliente
        const token = jwt.sign(payload, sign);
        res.json({ token });

        // Si el usuario o la contraseña son incorrectos
      } else res.json({ error: "Usuario o contraseña incorrectos." });
    }
  }
}

export default login;
