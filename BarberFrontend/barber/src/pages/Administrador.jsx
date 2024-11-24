import * as React from "react";
import { Skeleton } from "@mui/material"; // Asegúrate de importar Skeleton
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import EventIcon from "@mui/icons-material/Event";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import Grid from "@mui/material/Grid";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ServicesTable from "../components/CrudAdmin/ServiceCrud.jsx";
import EmployeesTable from "../components/CrudAdmin/EmployeesCrud.jsx";
import ClientsTables from "../components/CrudAdmin/ClientsCrud.jsx";
import CitasTables from "../components/CrudAdmin/CitasTable.jsx";
import CitasRegistro from '../components/Clientes/CitasCliente.jsx';
import Egreso from '../components/Caja/Egreso.jsx';
import Ingreso from '../components/Caja/Ingreso.jsx';
import ArqueodeCaja from "../components/Caja/ArqueodeCaja.jsx";
import { extendTheme } from '@mui/material/styles';
import "../styles/Administrador.css";

// Configuración de navegación
const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "Empleados",
    title: "Empleados",
    icon: <GroupIcon />,
  },
  {
    segment: "Clientes",
    title: "Clientes",
    icon: <GroupsIcon />,
  },
  {
    segment: "Servicios",
    title: "Servicios",
    icon: <ContentCutIcon />,
  },
  {
    segment: "Caja",
    title: "Caja",
    icon: <AttachMoneyIcon />,
    children: [
      {
        segment: "Egreso",
        title: "Egreso",
        icon: <DescriptionIcon />,
      },
      {
        segment: "Ingreso",
        title: "Ingreso",
        icon: <DescriptionIcon />,
      },
      {
        segment: "Arqueo",
        title: "Arqueo",
        icon: <DescriptionIcon />,
      }
    ],
  },
  {
    segment: "Citas",
    title: "Citas",
    icon: <EventIcon />,
    children: [
      {
        segment: "Registrar",
        title: "Registrar",
        icon: <DescriptionIcon />,
      },
      {
        segment: "Consultar",
        title: "Consultar",
        icon: <DescriptionIcon />,
      },
    ],
  },
];

// Configuración de tema
const demoTheme = extendTheme({
  colorSchemes: { light: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Branding
const BRANDING = {
  title: "BarberXE",
  logo: (
    <img
      src="https://cdn-icons-png.flaticon.com/512/7338/7338646.png"
      alt="barber"
      className="logo"
    />
  ),
};

// Función de router personalizada
function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => ({
    pathname,
    searchParams: new URLSearchParams(),
    navigate: (path) => setPathname(path),
  }), [pathname]);

  return router;
}

// Componente principal
export default function Administrador(props) {
  const { window } = props;
  const router = useDemoRouter("/dashboard");
  const demoWindow = window ? window() : undefined;

  // Renderizar contenido según la ruta
  const renderContent = () => {
    switch (router.pathname) {
      case "/Servicios":
        return <ServicesTable />;
      case "/Empleados":
        return <EmployeesTable />;
      case "/Clientes":
        return <ClientsTables />;
      case "/Citas/Registrar":
        return <CitasRegistro />;
      case "/Citas/Consultar":
        return <CitasTables />;
      case "/Caja/Egreso":
        return <Egreso />;
      case "/Caja/Ingreso":
        return <Ingreso />;
      case "/Caja/Arqueo":
        return <ArqueodeCaja />;
      default:
        return (
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
        );
    }
  };

  return (
    <AppProvider
      branding={BRANDING}
      navigation={NAVIGATION}
      router={router}
      window={demoWindow}
      theme={demoTheme}
    >
      <DashboardLayout>
        <PageContainer>{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
