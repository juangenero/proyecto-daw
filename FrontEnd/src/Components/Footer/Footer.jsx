import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="mt-5" /> {/** Div vacío con margen para que el pié de página no tape el contenido si se hace zoom */}
      <footer className="fixed-bottom bg-gradient bg-primary py-3">
        <div className="fs-5 text-white text-center">Proyecto DAW 2022-2023 - Juan Genero Espinosa</div>
      </footer>
    </div>
  );
}