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

export default function ServicesTable() {
  const [rows, setRows] = React.useState([
    { id: 1, name: "Corte de cabello", price: "$10", description: "un fade", state: "Activo" },
    { id: 2, name: "Afeitado", price: "$8", description: "x", state: "Activo" },
    { id: 3, name: "Tinte", price: "$15", description: "un cambio de color de cabello", state: "Activo" },
  ]);
  
  const [open, setOpen] = React.useState(false);
  const [newService, setNewService] = React.useState({ id: null, name: "", price: "", description: "", state: "" });
  const [editing, setEditing] = React.useState(false); // Control si es un servicio nuevo o uno que se está editando

  // Función para manejar el evento de añadir servicio
  const handleAddService = () => {
    setEditing(false); // Asegurarse de que está en modo de añadir
    setNewService({ id: null, name: "", price: "", description: "", state: "" }); // Limpiar los campos
    setOpen(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false);
    setNewService({ id: null, name: "", price: "", description: "", state: "" }); // Limpiar los campos al cerrar
  };

  // Función para manejar el envío del formulario (añadir o editar)
  const handleSubmit = () => {
    if (editing) {
      // Editar servicio
      const updatedRows = rows.map((row) =>
        row.id === newService.id ? { ...row, ...newService } : row
      );
      setRows(updatedRows);
    } else {
      // Añadir nuevo servicio
      const newRow = {
        ...newService,
        id: rows.length + 1, // Suponiendo que el ID es automático
      };
      setRows([...rows, newRow]);
    }
    handleClose();
  };

  // Función para manejar la eliminación de un servicio
  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // Función para manejar la edición de un servicio
  const handleEdit = (id) => {
    const serviceToEdit = rows.find((row) => row.id === id);
    setNewService(serviceToEdit);
    setEditing(true); // Establecer que estamos editando
    setOpen(true); // Abrir el modal
  };

  return (
    <div style={{ padding: "16px" }}>
      {/* Botón para añadir nuevo servicio */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddService}
        style={{ marginBottom: "16px" }}
      >
        Añadir Servicio
      </Button>

      {/* Tabla de servicios */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre del Servicio</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Estado</TableCell>
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
                <TableCell>{row.state}</TableCell>
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

      {/* Modal para añadir o editar un servicio */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? "Editar Servicio" : "Añadir Nuevo Servicio"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nombre del Servicio"
            fullWidth
            variant="outlined"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          />
          <TextField
            margin="dense"
            id="price"
            label="Precio"
            fullWidth
            variant="outlined"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: e.target.value })}
          />
          <TextField
            margin="dense"
            id="description"
            label="Descripción"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          />
          <TextField
            margin="dense"
            id="state"
            label="Estado"
            fullWidth
            variant="outlined"
            value={newService.state}
            onChange={(e) => setNewService({ ...newService, state: e.target.value })}
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
