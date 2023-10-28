// Convertir imagen a base64
function imgToBase64(image, callback) {
  const reader = new FileReader(); // Abre el flujo de datos (stream)

  // Si se seleccionado una imagen
  if (image) reader.readAsDataURL(image); // Intenta leer la imagen
  else callback(null);

  // Si todo va bien, devuelve en una función de callback con la imagen en base64
  reader.onload = () => {
    callback(reader.result);
  };

  // Si algo va mal, devuelve "null"
  reader.onerror = () => {
    callback(null);
  };
}

export default imgToBase64;
