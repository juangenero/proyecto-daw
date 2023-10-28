import { getToken, deleteToken } from "../Services/auth.service.js";
import axios from "axios";

// Si existe la variable de entorno la usa, en caso contrario la URL de la api será localhost
const ApiBaseURL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

// Instancia de axios
export const clientAxios = axios.create({
  baseURL: ApiBaseURL + "/api",
});

// Interceptor de la instancia "clientAxios" que añade a todas las cabeceras de las peticiones HTTP el JWT si existe
clientAxios.interceptors.request.use((request) => {
  request.headers["Authorization"] = getToken();
  return request;
});

// Interceptor de la instancia "clientAxios" que comprueba en cada respuesta si se ha recibido un código 403
clientAxios.interceptors.response.use(
  // Si la respuesta es correcta (respuesta con código 2XX)
  function (response) {
    return response;
  },

  // Si la respuesta no es correcta (respuesta fuera del rango 2XX)
  function (error) {
    // Si se ha recibido un código 403, significa que el token almacenado no existe, no es válido o ha expirado.
    if (error.response.status === 403) {
      deleteToken(); // Elimina el token
      window.location.reload(); // Recarga la página reiniciando la aplicación por completo.
    }
    return Promise.reject(error);
  }
);
