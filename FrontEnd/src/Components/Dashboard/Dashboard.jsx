// Diseño
import { Stack } from "react-bootstrap";

// Navegación del Dashboard
import DashboardNav from "./DashboardNav";
import DashboardRoutes from "../../Routes/DashboardRoutes";
import { UserContextProvider } from "../../Context/UserContext";
import { VaccineContextProvider } from "../../Context/VaccineContext";
import { VaccineAplicationsContextProvider } from "../../Context/VaccineAplicationsContext";
import { PetsContextProvider } from "../../Context/PetsContext";
import { ConsultContextProvider } from "../../Context/ConsultsContext";

// Estructura común a todas las páginas del Dashboard.
export function Dashboard() {
  return (
    <Stack>
      {/* Menú de navegación del dashboard */}
      <div className="bg-secondary rounded bg-gradient">
        <DashboardNav />
      </div>

      {/* Se utilizan la mayoría de contextos en el dashboard para gestionar los estados */}
      <div className="bg-light rounded p-2">
        <UserContextProvider>
          <PetsContextProvider>
            <ConsultContextProvider>
              <VaccineContextProvider>
                <VaccineAplicationsContextProvider>
                  <DashboardRoutes />
                </VaccineAplicationsContextProvider>
              </VaccineContextProvider>
            </ConsultContextProvider>
          </PetsContextProvider>
        </UserContextProvider>
      </div>
    </Stack>
  );
}
