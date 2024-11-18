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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function ClientsCrud() {
  const [rows, setRows] = React.useState([
    { id: 1, nombre: "Juan", apellido: "Pérez", correo: "juan@example.com", telefono: "123-456-7890", cuenta_id: "C1" },
    { id: 2, nombre: "Ana", apellido: "López", correo: "ana@example.com", telefono: "987-654-3210", cuenta_id: "C2" },
    { id: 3, nombre: "Carlos", apellido: "Martínez", correo: "carlos@example.com", telefono: "555-666-7777", cuenta_id: "C3" },
  ]);

  const [open, setOpen] = React.useState(false);
  const [newClient, setNewClient] = React.useState({
    id: null,
    nombre: "",
    apellido: "",
    correo: "",
    telefono: "",
    cuenta_id: "",
  });
  const [editing, setEditing] = React.useState(false); // Control si es un cliente nuevo o uno que se está editando

  // Función para manejar el evento de añadir cliente
  const handleAddClient = () => {
    setEditing(false); // Asegurarse de que está en modo de añadir
    setNewClient({
      id: null,
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      cuenta_id: "",
    }); // Limpiar los campos
    setOpen(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false);
    setNewClient({
      id: null,
      nombre: "",
      apellido: "",
      correo: "",
      telefono: "",
      cuenta_id: "",
    }); // Limpiar los campos al cerrar
  };

  // Función para manejar el envío del formulario (añadir o editar)
  const handleSubmit = () => {
    if (editing) {
      // Editar cliente
      const updatedRows = rows.map((row) =>
        row.id === newClient.id ? { ...row, ...newClient } : row
      );
      setRows(updatedRows);
    } else {
      // Añadir nuevo cliente
      const newRow = {
        ...newClient,
        id: rows.length + 1, // Suponiendo que el ID es automático
      };
      setRows([...rows, newRow]);
    }
    handleClose();
  };

  // Función para manejar la eliminación de un cliente
  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // Función para manejar la edición de un cliente
  const handleEdit = (id) => {
    const clientToEdit = rows.find((row) => row.id === id);
    setNewClient(clientToEdit);
    setEditing(true); // Establecer que estamos editando
    setOpen(true); // Abrir el modal
  };

  return (
    <div style={{ padding: "16px" }}>
      {/* Botón para añadir nuevo cliente */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddClient}
        style={{ marginBottom: "16px" }}
      >
        Añadir Cliente
      </Button>

      {/* Tabla de clientes */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Cuenta ID</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.apellido}</TableCell>
                <TableCell>{row.correo}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>{row.cuenta_id}</TableCell>
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

      {/* Modal para añadir o editar un cliente */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? "Editar Cliente" : "Añadir Nuevo Cliente"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nombre"
            label="Nombre"
            fullWidth
            variant="outlined"
            value={newClient.nombre}
            onChange={(e) => setNewClient({ ...newClient, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            id="apellido"
            label="Apellido"
            fullWidth
            variant="outlined"
            value={newClient.apellido}
            onChange={(e) => setNewClient({ ...newClient, apellido: e.target.value })}
          />
          <TextField
            margin="dense"
            id="correo"
            label="Correo"
            fullWidth
            variant="outlined"
            value={newClient.correo}
            onChange={(e) => setNewClient({ ...newClient, correo: e.target.value })}
          />
          <TextField
            margin="dense"
            id="telefono"
            label="Teléfono"
            fullWidth
            variant="outlined"
            value={newClient.telefono}
            onChange={(e) => setNewClient({ ...newClient, telefono: e.target.value })}
          />
          <TextField
            margin="dense"
            id="cuenta_id"
            label="Cuenta ID"
            fullWidth
            variant="outlined"
            value={newClient.cuenta_id}
            onChange={(e) => setNewClient({ ...newClient, cuenta_id: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editing ? "Guardar Cambios" : "Añadir"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ClientsCrud;
