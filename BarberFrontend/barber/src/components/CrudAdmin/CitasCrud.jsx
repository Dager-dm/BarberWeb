import React, { useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom"; 
import CitaService from "../../services/CitasService"; 
import { styled } from "@mui/system";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Crear un tema
const theme = createTheme({
  palette: {
    mode: "light", // Cambiar a "dark" para el modo oscuro
    primary: {
      main: "#2575fc",
    },
    secondary: {
      main: "#6a11cb",
    },
  },
});

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.mode === "dark"
    ? "linear-gradient(to right, #6a11cb, #2575fc)"
    : "linear-gradient(to right, #2575fc, #6a11cb)",
  color: "#fff",
  padding: "10px 20px",
  fontWeight: "bold",
  borderRadius: "25px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: theme.palette.mode === "dark"
      ? "linear-gradient(to right, #5a0dba, #1f60d0)"
      : "linear-gradient(to right, #1f60d0, #5a0dba)",
  },
}));

function CitasCrud() {
  const [citas, setCitas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Almacenar ID de la cita a eliminar
  const navigate = useNavigate();

  // Cargar las citas desde el backend
  const fetchCitas = async () => {
    try {
      const data = await CitaService.getCitas();
      setCitas(data);
    } catch (error) {
      console.error("Error al cargar las citas:", error);
    }
  };

  useEffect(() => {
    fetchCitas();
  }, []);

  // Manejar la creación de cita
  const handleAddCita = () => {
    navigate("/CitasCliente");  // Redirigir a la página de creación
  };

  // Manejar la edición de cita
  const handleEditCita = (id) => {
    navigate(`/CitasCliente?id=${id}`);  // Redirigir a la página de edición con el ID
  };

  // Manejar la apertura del diálogo de confirmación
  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setOpenDialog(true);  // Mostrar el diálogo
  };

  // Manejar el cierre del diálogo sin eliminar
  const handleDeleteClose = () => {
    setDeleteId(null);
    setOpenDialog(false);  // Cerrar el diálogo
  };

  // Eliminar una cita
  const handleDelete = async () => {
    try {
      await CitaService.deleteCita(deleteId);
      fetchCitas();  // Recargar las citas después de eliminar
      handleDeleteClose(); // Cerrar el diálogo
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ padding: "16px" }}>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCita}
          style={{ marginBottom: "16px", textTransform: "none" }}
        >
          Añadir cita
        </StyledButton>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Servicio</TableCell>
                <TableCell>Barbero</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {citas.map((cita) => (
                <TableRow key={cita.id}>
                  <TableCell>{cita.id}</TableCell>
                  <TableCell>{cita.servicio}</TableCell>
                  <TableCell>{cita.barbero}</TableCell>
                  <TableCell>{cita.fecha}</TableCell>
                  <TableCell>{cita.hora}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditCita(cita.id)}  // Editar cita
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteOpen(cita.id)}  // Eliminar cita
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Dialogo de confirmación para eliminar */}
        <Dialog open={openDialog} onClose={handleDeleteClose}>
          <DialogTitle>Confirmar eliminación</DialogTitle>
          <DialogContent>
            <Typography>
              ¿Estás seguro de que deseas eliminar esta cita? Esta acción no se puede deshacer.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </ThemeProvider>
  );
}

export default CitasCrud;
