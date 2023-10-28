/**
 * Convierte una fecha a formato YYYY-MM-DD
 * @param {Date} date fecha
 * @returns fecha formateada
 */
export function dateFormat(date) {
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let fullYear = date.getFullYear();

  return `${fullYear}-${month}-${day}`;
}