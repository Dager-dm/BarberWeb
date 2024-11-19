import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { Scissors, Clock } from 'lucide-react';

function ServiceCard({ service, selected, onClick }) {
  const theme = useTheme(); // Usamos el tema global de MUI

  // Estilos dinámicos que responden al tema y al estado seleccionado
  const cardStyles = {
    padding: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
    backgroundColor: selected
      ? theme.palette.primary.main // Fondo cuando está seleccionado
      : theme.palette.background.secondary, // Fondo según el tema actual
    boxShadow: selected
      ? `0px 4px 8px ${theme.palette.primary.main}` // Sombra al seleccionar
      : `0px 2px 4px ${theme.palette.divider}`, // Sombra normal
    transform: selected ? 'scale(1.05)' : 'scale(1)',
  };

  const iconColor = selected
    ? theme.palette.common.secondary // Icono blanco si está seleccionado
    : theme.palette.text.primary; // Icono dinámico según el tema

  return (
    <Box
      onClick={onClick}
      sx={{
        ...cardStyles,
        '&:hover': {
          boxShadow: `0px 4px 8px ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Scissors style={{ color: iconColor, width: 24, height: 24 }} />
        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
          ${service.price}
        </Typography>
      </Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {service.name}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Clock style={{ color: iconColor, width: 20, height: 20, marginRight: 8 }} />
        <Typography variant="body2">{service.duration} min</Typography>
      </Box>
    </Box>
  );
}

export default ServiceCard;
