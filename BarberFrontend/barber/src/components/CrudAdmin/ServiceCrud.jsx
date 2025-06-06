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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";
import ServiceService from "../../services/ServiceService";
import { Duration } from 'luxon';

const StyledButton = styled(Button)({
  background: "linear-gradient(to right, #ff416c, #ff4b2b)",
  color: "#fff",
  padding: "10px 20px",
  fontWeight: "bold",
  borderRadius: "25px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
 "&:hover": {
    background: "linear-gradient(to right, #c82333, #a71d2a)",
  },
});

const StyledButtonCancel = styled(Button)({
  background: "Red",
  color: "#fff",
  padding: "10px 20px",
  fontWeight: "bold",
  borderRadius: "25px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  "&:hover": {
    background: "linear-gradient(to right, #c82333, #a71d2a)",
  },
});

const StyledButtonSave = styled(Button)({
  background: "linear-gradient(to right, #7ed957, #5dc82e)",
  color: "#fff",
  padding: "10px 20px",
  fontWeight: "bold",
  borderRadius: "25px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
 "&:hover": {
    background: "linear-gradient(to right, #c82333, #a71d2a)"
  },
});

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    padding: "24px",
    background: "linear-gradient(to right, #ffffff, #f7f9fc)",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
});

function ServicesCrud() {
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [serviceToDelete, setServiceToDelete] = React.useState(null);
  const [newService, setNewService] = React.useState({ id: null, name: "", price: "", duration: "" });
  const [editing, setEditing] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const SeService = new ServiceService();

  const convertirDurationAMinutos = (duration) => {
    const duracion = Duration.fromISO(duration);
    return duracion.as('minutes');
  };





  // Cargar servicios desde el backend
  const fetchServices = async () => {
    SeService.getServices().then(service => {
      setRows(Array.isArray(service) ? service : []);
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  React.useEffect(() => {
    fetchServices();
  }, []);

  const validate = () => {
    let temp = {};
    temp.name = newService.name ? "" : "El nombre es obligatorio.";
    temp.price = newService.price ? "" : "El precio es obligatorio.";
    temp.duration = newService.duration ? "" : "La duración es obligatoria.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleAddService = () => {
    setEditing(false);
    setNewService({ id: null, name: "", price: "", duration: "" });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewService({ id: null, name: "", price: "", duration: "" });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (editing) {
      await SeService.updateService(newService);
    } else {
      await SeService.addService(newService);
    }
    fetchServices();
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
    await SeService.deleteService(serviceToDelete);
    fetchServices();
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
        style={{ marginBottom: "16px", textTransform: "none"}}
      >
        Añadir Servicio
      </StyledButton>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Duración</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{convertirDurationAMinutos(row.duracion)} min</TableCell>
                <TableCell>${row.precio}</TableCell>
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
        <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
          {editing ? "Editar Servicio" : "Añadir Nuevo Servicio"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}>
            <TextField
              label="Nombre"
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
              label="Duración"
              variant="outlined"
              fullWidth
              value={newService.duration}
              error={!!errors.duration}
              helperText={errors.duration}
              onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
        <StyledButtonCancel onClick={handleClose} style={{ marginRight: "10px" }}>
            Cancelar
          </StyledButtonCancel>
          <StyledButtonSave onClick={handleSubmit}>
            {editing ? "Actualizar" : "Guardar"}
          </StyledButtonSave>
        </DialogActions>
      </StyledDialog>

      <Dialog open={openConfirm} onClose={cancelDelete}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este servicio?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary" style={{ textTransform: "none" }}>
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" style={{ textTransform: "none" }}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ServicesCrud;
