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

function ClientsCrud() {
  const theme = useTheme(); // Detectar el tema actual

  const [rows, setRows] = React.useState([
    { cedula: "123456789", nombre: "Juan Pérez", correo: "juan@email.com", contrasena: "password123", telefono: "3101234567" },
    { cedula: "987654321", nombre: "Ana López", correo: "ana@email.com", contrasena: "password456", telefono: "3009876543" },
    { cedula: "111223344", nombre: "Carlos Martínez", correo: "carlos@email.com", contrasena: "password789", telefono: "3012345678" }
  ]);

  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [clientToDelete, setClientToDelete] = React.useState(null);

  const [newClient, setNewClient] = React.useState({ cedula: "", nombre: "", correo: "", contrasena: "", telefono: "" });
  const [editing, setEditing] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    let temp = {};
    temp.cedula = newClient.cedula ? "" : "La cédula es obligatoria.";
    temp.nombre = newClient.nombre ? "" : "El nombre es obligatorio.";
    temp.correo = newClient.correo ? "" : "El correo es obligatorio.";
    temp.contrasena = newClient.contrasena ? "" : "La contraseña es obligatoria.";
    temp.telefono = newClient.telefono ? "" : "El teléfono es obligatorio.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleAddClient = () => {
    setEditing(false);
    setNewClient({ cedula: "", nombre: "", correo: "", contrasena: "", telefono: "" });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewClient({ cedula: "", nombre: "", correo: "", contrasena: "", telefono: "" });
    setErrors({});
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (editing) {
      const updatedRows = rows.map((row) =>
        row.cedula === newClient.cedula ? { ...row, ...newClient } : row
      );
      setRows(updatedRows);
    } else {
      setRows([...rows, { ...newClient }]);
    }
    handleClose();
  };

  const handleEdit = (cedula) => {
    const clientToEdit = rows.find((row) => row.cedula === cedula);
    setNewClient(clientToEdit);
    setEditing(true);
    setErrors({});
    setOpen(true);
  };

  const handleDelete = (cedula) => {
    setClientToDelete(cedula);
    setOpenConfirm(true);
  };

  const confirmDelete = () => {
    const updatedRows = rows.filter((row) => row.cedula !== clientToDelete);
    setRows(updatedRows);
    setOpenConfirm(false);
    setClientToDelete(null);
  };

  const cancelDelete = () => {
    setOpenConfirm(false);
    setClientToDelete(null);
  };

  return (
    <div style={{ padding: "16px" }}>
      <StyledButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddClient}
        style={{ marginBottom: "16px" }}
      >
        Añadir Cliente
      </StyledButton>

      {/* Tabla de clientes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cédula</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Contraseña</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.cedula}>
                <TableCell>{row.cedula}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.correo}</TableCell>
                <TableCell>{row.contrasena}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEdit(row.cedula)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(row.cedula)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal para añadir o editar cliente */}
      <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
          }}
        >
          {editing ? "Editar Cliente" : "Añadir Nuevo Cliente"}
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              paddingTop: 2,
            }}
          >
            <TextField
              label="Cédula"
              variant="outlined"
              fullWidth
              value={newClient.cedula}
              error={!!errors.cedula}
              helperText={errors.cedula}
              onChange={(e) => setNewClient({ ...newClient, cedula: e.target.value })}
            />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={newClient.nombre}
              error={!!errors.nombre}
              helperText={errors.nombre}
              onChange={(e) => setNewClient({ ...newClient, nombre: e.target.value })}
            />
            <TextField
              label="Correo"
              variant="outlined"
              fullWidth
              value={newClient.correo}
              error={!!errors.correo}
              helperText={errors.correo}
              onChange={(e) => setNewClient({ ...newClient, correo: e.target.value })}
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              type="password"
              value={newClient.contrasena}
              error={!!errors.contrasena}
              helperText={errors.contrasena}
              onChange={(e) => setNewClient({ ...newClient, contrasena: e.target.value })}
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              value={newClient.telefono}
              error={!!errors.telefono}
              helperText={errors.telefono}
              onChange={(e) => setNewClient({ ...newClient, telefono: e.target.value })}
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

      {/* Cuadro de confirmación para eliminar */}
      <Dialog open={openConfirm} onClose={cancelDelete}>
        <DialogTitle
          sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
        >
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent
          sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
        >
          ¿Está seguro de que desea eliminar este cliente?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} variant="outlined" color="secondary">
            Cancelar
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClientsCrud;
