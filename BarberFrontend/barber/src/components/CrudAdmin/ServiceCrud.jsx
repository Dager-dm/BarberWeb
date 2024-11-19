import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

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

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    padding: theme.spacing(3),
    background: theme.palette.mode === "dark"
      ? "linear-gradient(to right, #1e1e1e, #252525)"
      : "linear-gradient(to right, #ffffff, #f7f9fc)",
    boxShadow: theme.palette.mode === "dark"
      ? "0px 4px 20px rgba(255, 255, 255, 0.1)"
      : "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
}));

function ServicesCrud() {
  const theme = useTheme();

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [serviceToDelete, setServiceToDelete] = React.useState(null);
  const [newService, setNewService] = React.useState({ id: null, name: "", price: "", description: "" });
  const [editing, setEditing] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  // Vacío: cargar servicios desde el backend
  const fetchServices = async () => {
    // Aquí se implementará la lógica para obtener los servicios del backend.
    console.log("Cargar servicios (vacío)");
  };

  React.useEffect(() => {
    fetchServices();
  }, []);

  const validate = () => {
    let temp = {};
    temp.name = newService.name ? "" : "El nombre es obligatorio.";
    temp.price = newService.price ? "" : "El precio es obligatorio.";
    temp.description = newService.description ? "" : "La descripción es obligatoria.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleAddService = () => {
    setEditing(false);
    setNewService({ id: null, name: "", price: "", description: "" });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewService({ id: null, name: "", price: "", description: "" });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (editing) {
      // Vacío: actualizar servicio
      console.log("Actualizar servicio (vacío):", newService);
    } else {
      // Vacío: añadir nuevo servicio
      console.log("Añadir servicio (vacío):", newService);
    }
    handleClose();
  };

  const handleEdit = (id) => {
    const serviceToEdit = rows.find((row) => row.id === id);
    setNewService(serviceToEdit);
    setEditing(true);
    setErrors({});
    setOpen(true);
  };

  const handleDelete = (id) => {
    setServiceToDelete(id);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    // Vacío: eliminar servicio
    console.log("Eliminar servicio (vacío):", serviceToDelete);
    setOpenConfirm(false);
  };

  const cancelDelete = () => {
    setOpenConfirm(false);
    setServiceToDelete(null);
  };

  return (
    <div style={{ padding: "16px" }}>
      <StyledButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddService}
        style={{ marginBottom: "16px" }}
      >
        Añadir Servicio
      </StyledButton>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre del Servicio</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(row.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
          }}
        >
          {editing ? "Editar Servicio" : "Añadir Nuevo Servicio"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}>
            <TextField
              label="Nombre del Servicio"
              variant="outlined"
              fullWidth
              value={newService.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
            />
            <TextField
              label="Precio"
              variant="outlined"
              fullWidth
              value={newService.price}
              error={!!errors.price}
              helperText={errors.price}
              onChange={(e) => setNewService({ ...newService, price: e.target.value })}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              value={newService.description}
              error={!!errors.description}
              helperText={errors.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editing ? "Guardar Cambios" : "Añadir"}
          </Button>
        </DialogActions>
      </StyledDialog>

      <Dialog open={openConfirm} onClose={cancelDelete}>
        <DialogTitle sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}>
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este servicio?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ServicesCrud;
