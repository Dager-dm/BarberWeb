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
import ClientService from "../../services/ClientService"; 

const StyledButton = styled(Button)({
  background: "linear-gradient(to right, #2575fc, #6a11cb)",
  color: "#fff",
  padding: "10px 20px",
  fontWeight: "bold",
  borderRadius: "25px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  "&:hover": {
    background: "linear-gradient(to right, #1f60d0, #5a0dba)",
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

function ClientsCrud() {
  const theme = useTheme();

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [clientToDelete, setClientToDelete] = React.useState(null);
  const [newClient, setNewClient] = React.useState({
    cedula: "",
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [editing, setEditing] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  // Cargar clientes desde el backend
  const fetchClients = async () => {
    const clients = await ClientService.getClients();
    setRows(clients);
    console.log("Clientes cargados:", clients);
  };

  React.useEffect(() => {
    fetchClients();
  }, []);

  const validate = () => {
    let temp = {};
    temp.cedula = newClient.cedula ? "" : "La cédula es obligatoria.";
    temp.name = newClient.name ? "" : "El nombre es obligatorio.";
    temp.email = newClient.email ? "" : "El correo es obligatorio.";
    temp.password = newClient.password ? "" : "La contraseña es obligatoria.";
    temp.phone = newClient.phone ? "" : "El teléfono es obligatorio.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleAddClient = () => {
    setEditing(false);
    setNewClient({
      cedula: "",
      name: "",
      email: "",
      password: "",
      phone: "",
    });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewClient({
      cedula: "",
      name: "",
      email: "",
      password: "",
      phone: "",
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (editing) {
      // Actualizar cliente
      await ClientService.updateClient(newClient);
      console.log("Cliente actualizado:", newClient);
    } else {
      // Añadir nuevo cliente
      await ClientService.createClient(newClient);
      console.log("Cliente añadido:", newClient);
    }
    handleClose();
    fetchClients(); // Recargar la lista de clientes
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

  const confirmDelete = async () => {
    // Eliminar cliente
    await ClientService.deleteClient(clientToDelete);
    console.log("Cliente eliminado:", clientToDelete);
    setOpenConfirm(false);
    fetchClients(); // Recargar la lista de clientes
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
        style={{ marginBottom: "16px", textTransform: "none" }}
      >
        Añadir cliente
      </StyledButton>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cédula</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.cedula}>
                <TableCell>{row.cedula}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}>
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
              value={newClient.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={newClient.email}
              error={!!errors.email}
              helperText={errors.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              type="password"
              value={newClient.password}
              error={!!errors.password}
              helperText={errors.password}
              onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              value={newClient.phone}
              error={!!errors.phone}
              helperText={errors.phone}
              onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
          <Button 
            onClick={handleClose} 
            variant="outlined" 
            color="secondary"
            style={{ textTransform: "none" }} 
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit} 
            variant="contained" 
            color="primary"
            style={{ textTransform: "none" }} 
          >
            {editing ? "Guardar Cambios" : "Añadir"}
          </Button>
        </DialogActions>
      </StyledDialog>

      <Dialog open={openConfirm} onClose={cancelDelete}>
        <DialogTitle sx={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}>
          Confirmar eliminación
        </DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este cliente?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} variant="outlined" color="secondary" style={{ textTransform: "none" }}>
            Cancelar
          </Button>
          <Button onClick={confirmDelete} variant="contained" color="error" style={{ textTransform: "none" }}>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ClientsCrud; 
