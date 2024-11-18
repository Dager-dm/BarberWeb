import * as React from 'react';
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EventIcon from '@mui/icons-material/Event';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import CitasCliente from '../components/CitasCliente.jsx';
import '../styles/Cliente.css';

const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'Citas',
    title: 'Citas',
    icon: <EventIcon />,
  },
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
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

const Skeleton = styled('div')(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

const BRANDING = {
  title: 'BarberXE',
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

  const router = useDemoRouter('/dashboard');
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      branding={BRANDING}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
            <Grid xs={12}>
          {/* Renderizar el componente CitasCliente solo si la ruta es /Citas */}
          {router.pathname === '/Citas' && <CitasCliente />}
            </Grid>
            <Grid xs={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid xs={4}>
              <Skeleton height={100} />
            </Grid>
            <Grid xs={8}>
              <Skeleton height={100} />
            </Grid>

            <Grid xs={12}>
              <Skeleton height={150} />
            </Grid>
            <Grid xs={12}>
              <Skeleton height={14} />
            </Grid>

            <Grid xs={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid xs={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid xs={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid xs={3}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}

