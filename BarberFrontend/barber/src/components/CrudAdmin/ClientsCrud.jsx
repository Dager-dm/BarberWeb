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
  const clientService = new ClientService();
  // Cargar clientes desde el backend
  const fetchClients = async () => {
    clientService.getClientes().then(clientes => {
      console.log('Clientes:', clientes);
      setRows(Array.isArray(clientes) ? clientes : []);
    }).catch(error => {
      console.error('Error:', error);
    });
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
      console.log(await clientService.updateCliente(newClient));
    } else {
      // Añadir nuevo cliente
      console.log(await clientService.addCliente(newClient));
    }
    handleClose();
    fetchClients(); // Recargar la lista de clientes
  };

  const handleEdit = (id) => {
    const clientToEdit = rows.find((row) => row.id === id);
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
    console.log(await clientService.deleteCliente(clientToDelete));
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
        style={{ textTransform: "none" }}
      >
        Añadir Cliente
      </StyledButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cédula</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.cedula}>
                <TableCell>{row.cedula}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.usuario.correo}</TableCell>
                <TableCell>{row.telefono}</TableCell>
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
          <StyledButtonCancel onClick={handleClose} style={{ marginRight: "10px", TextTransform: "none"}}>
            Cancelar
          </StyledButtonCancel>
          <StyledButtonSave onClick={handleSubmit} style={{ marginRight: "10px", TextTransform: "none"}}>
            {editing ? "Actualizar" : "Guardar"}
          </StyledButtonSave>
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
