import { clientAxios } from "../Utils/axios-instances.js";
import { decodeToken } from "react-jwt";
import md5 from "md5";

// Realiza una llamada a la API para la solicitud de inicio de sesión
export async function login(username, password) {
  // En esta llamada no se aprovecha totalmente la funcionalidad de "clientAxios", pero ahorro algunos imports.
  return await clientAxios.post("/login", {
    username: username,
    password: password ? md5(password) : "", // Si se ha introducido una contraseña, la encripta
  });
}

// Elimina el local storage, actualiza el estado del usuario y redirige a la ruta principal
export function logout(setUser, navigate) {
  deleteToken();
  setUser({ id: null });
  navigate("/");
}

/**
 * Obtiene el token de local storage
 * @returns El valor del token o null si no existe
 */
export function getToken() {
  return localStorage.getItem("token");
}

/**
 * Almacena el token en local storage
 * @param {String} token Token JWT
 */
export function setToken(token) {
  localStorage.setItem("token", token);
}

/**
 * Elimina el token de local storage
 */
export function deleteToken() {
  localStorage.removeItem("token");
}

/**
 * Decodifica el token de local storage
 * @returns Contenido del token o null si no existe
 */
export function decodeJWT() {
  return decodeToken(getToken());
}
