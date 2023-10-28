/**
 * Middleware a nivel de enrutador que intercepta las solicitudes HTTP sólo disponibles para los veterinarios
 * y comprueba el rol del usuario autenticado.
 * Realiza distintas operaciones dependiendo de si es un cliente o un veterinario.
 * Se ejecuta después del middleware de aplicación "ValidateAuth.js".
 * 
 * !! Función no implementaqda por falta de tiempo.
 * 
 */
export function validateRolUser(req, res, next) {
  next();
}

export default validateRolUser;
