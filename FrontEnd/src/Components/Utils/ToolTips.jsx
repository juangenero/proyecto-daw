import React from "react";
import { Tooltip } from "react-bootstrap";

// El tooltip es el mensaje que sale cuando se pasa el ratón por encima de los iconos "Ver", "Editar" y "Eliminar" de las tablas de datos.

/**
 * ToolTip con el texto "Ver"
 * @param {*} props Propiedades
 * @returns ToolTip con el texto "Ver"
 */
export function viewToolTip(props) {
  return (
    <Tooltip id="view-tooltip" {...props}>
      Ver
    </Tooltip>
  );
}

/**
 * ToolTip con el texto "Editar"
 * @param {*} props Propiedades
 * @returns ToolTip con el texto "Editar"
 */
export function editToolTip(props) {
  return (
    <Tooltip id="edit-tooltip" {...props}>
      Editar
    </Tooltip>
  );
}

/**
 * ToolTip con el texto "Eliminar"
 * @param {*} props Propiedades
 * @returns ToolTip con el texto "Eliminar"
 */
export function deleteToolTip(props) {
  return (
    <Tooltip id="delete-tooltip" {...props}>
      Eliminar
    </Tooltip>
  );
}

/**
 * ToolTip con el texto "Añadir"
 * @param {*} props Propiedades
 * @returns ToolTip con el texto "Añadir"
 */
export function addToolTip(props) {
  return (
    <Tooltip id="add-tooltip" {...props}>
      Añadir
    </Tooltip>
  );
}
