import * as React from "react";
import { extendTheme, styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionIcon from "@mui/icons-material/Description";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import EventIcon from "@mui/icons-material/Event";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import GroupIcon from '@mui/icons-material/Group';
import GroupsIcon from '@mui/icons-material/Groups';
import Grid from "@mui/material/Grid2";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ServicesTable from "../components/CrudAdmin/ServiceCrud.jsx";
import EmployeesTable from "../components/CrudAdmin/EmployeesCrud.jsx";
import ClientsTables from "../components/CrudAdmin/ClientsCrud.jsx";
import "../styles/Administrador.css";

const NAVIGATION = [
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "Empleados",
    title: "Empleados",
    icon: <GroupIcon  />,
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
        segment: "Arqueo de Caja",
        title: "Arqueo de Caja",
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: "Citas",
    title: "Citas",
    icon: <EventIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}

const Skeleton = styled("div")(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

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

export default function DashboardLayoutBasic(props) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");

  const demoWindow = window ? window() : undefined;

  const renderContent = () => {
    if (router.pathname === "/Servicios" ) {
      return <ServicesTable />; 
    }
    if (router.pathname === "/Empleados" ) {
      return <EmployeesTable />; 
    }
    if (router.pathname === "/Clientes" ) {
      return <ClientsTables />; 
    }


    
    return (
      <Grid container spacing={1}>
        <Grid size={5} />
        <Grid size={12}>
          <Skeleton height={14} />
        </Grid>
        <Grid size={12}>
          <Skeleton height={14} />
        </Grid>
        <Grid size={4}>
          <Skeleton height={100} />
        </Grid>
        <Grid size={8}>
          <Skeleton height={100} />
        </Grid>

        <Grid size={12}>
          <Skeleton height={150} />
        </Grid>
        <Grid size={12}>
          <Skeleton height={14} />
        </Grid>

        <Grid size={3}>
          <Skeleton height={100} />
        </Grid>
        <Grid size={3}>
          <Skeleton height={100} />
        </Grid>
        <Grid size={3}>
          <Skeleton height={100} />
        </Grid>
        <Grid size={3}>
          <Skeleton height={100} />
        </Grid>
      </Grid>
    );
  };

  return (
    <AppProvider
      branding={BRANDING}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>{renderContent()}</PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
