import React from "react";

// Contenido de las ruta
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "../Pages/FrontPage/Home";
import Services from "../Pages/FrontPage/Services";
import Contact from "../Pages/FrontPage/Contact";
import { Dashboard } from "../Components/Dashboard/Dashboard";

// Contexto (estados globales)
import { AppContext } from "../Context/AppContext";
import { useContext } from "react";
import { useEffect } from "react";

/**
 * Indica el contenido que debe mostrar en la parte principal cuando se visite las runas definidas
 */
function FrontRoutes() {
  const { user } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    // Si no hay usuario logueado y se intenta visitar una ruta protegida
    if (!user && location.pathname.match("/dashboard")) {
      window.sessionStorage.setItem("landingURL", location.pathname); // Almacena la URL visitada
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/contact" element={<Contact />} />
      {/** Renderizado condicional para Dashboard, sólo los usuarios autenticados podrán acceder */}
      <Route path="/dashboard/*" element={user ? <Dashboard /> : <Navigate replace to="/" />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default FrontRoutes;
