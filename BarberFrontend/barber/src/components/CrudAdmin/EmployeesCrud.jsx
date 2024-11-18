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

function EmployeesCrud() {
  const [rows, setRows] = React.useState([
    { id: 1, cedula: "1234567890", nombre: "Juan", apellido: "Pérez", telefono: "123-456-7890", estado: "Activo", cuenta_id: "A1", cargo: "Barbero" },
    { id: 2, cedula: "0987654321", nombre: "Ana", apellido: "López", telefono: "987-654-3210", estado: "Activo", cuenta_id: "A2", cargo: "Recepcionista" },
    { id: 3, cedula: "1122334455", nombre: "Carlos", apellido: "Martínez", telefono: "555-666-7777", estado: "Activo", cuenta_id: "A3", cargo: "Barbero" },
  ]);

  const [open, setOpen] = React.useState(false);
  const [newEmployee, setNewEmployee] = React.useState({
    id: null,
    cedula: "",
    nombre: "",
    apellido: "",
    telefono: "",
    estado: "",
    cuenta_id: "",
    cargo: "",
  });
  const [editing, setEditing] = React.useState(false); // Control si es un empleado nuevo o uno que se está editando

  // Función para manejar el evento de añadir empleado
  const handleAddEmployee = () => {
    setEditing(false); // Asegurarse de que está en modo de añadir
    setNewEmployee({
      id: null,
      cedula: "",
      nombre: "",
      apellido: "",
      telefono: "",
      estado: "",
      cuenta_id: "",
      cargo: "",
    }); // Limpiar los campos
    setOpen(true);
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setOpen(false);
    setNewEmployee({
      id: null,
      cedula: "",
      nombre: "",
      apellido: "",
      telefono: "",
      estado: "",
      cuenta_id: "",
      cargo: "",
    }); // Limpiar los campos al cerrar
  };

  // Función para manejar el envío del formulario (añadir o editar)
  const handleSubmit = () => {
    if (editing) {
      // Editar empleado
      const updatedRows = rows.map((row) =>
        row.id === newEmployee.id ? { ...row, ...newEmployee } : row
      );
      setRows(updatedRows);
    } else {
      // Añadir nuevo empleado
      const newRow = {
        ...newEmployee,
        id: rows.length + 1, // Suponiendo que el ID es automático
      };
      setRows([...rows, newRow]);
    }
    handleClose();
  };

  // Función para manejar la eliminación de un empleado
  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // Función para manejar la edición de un empleado
  const handleEdit = (id) => {
    const employeeToEdit = rows.find((row) => row.id === id);
    setNewEmployee(employeeToEdit);
    setEditing(true); // Establecer que estamos editando
    setOpen(true); // Abrir el modal
  };

  return (
    <div style={{ padding: "16px" }}>
      {/* Botón para añadir nuevo empleado */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddEmployee}
        style={{ marginBottom: "16px" }}
      >
        Añadir Empleado
      </Button>

      {/* Tabla de empleados */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Cuenta ID</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.cedula}</TableCell>
                <TableCell>{row.nombre}</TableCell>
                <TableCell>{row.apellido}</TableCell>
                <TableCell>{row.telefono}</TableCell>
                <TableCell>{row.estado}</TableCell>
                <TableCell>{row.cuenta_id}</TableCell>
                <TableCell>{row.cargo}</TableCell>
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

      {/* Modal para añadir o editar un empleado */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? "Editar Empleado" : "Añadir Nuevo Empleado"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="cedula"
            label="Cédula"
            fullWidth
            variant="outlined"
            value={newEmployee.cedula}
            onChange={(e) => setNewEmployee({ ...newEmployee, cedula: e.target.value })}
          />
          <TextField
            margin="dense"
            id="nombre"
            label="Nombre"
            fullWidth
            variant="outlined"
            value={newEmployee.nombre}
            onChange={(e) => setNewEmployee({ ...newEmployee, nombre: e.target.value })}
          />
          <TextField
            margin="dense"
            id="apellido"
            label="Apellido"
            fullWidth
            variant="outlined"
            value={newEmployee.apellido}
            onChange={(e) => setNewEmployee({ ...newEmployee, apellido: e.target.value })}
          />
          <TextField
            margin="dense"
            id="telefono"
            label="Teléfono"
            fullWidth
            variant="outlined"
            value={newEmployee.telefono}
            onChange={(e) => setNewEmployee({ ...newEmployee, telefono: e.target.value })}
          />
          <TextField
            margin="dense"
            id="estado"
            label="Estado"
            fullWidth
            variant="outlined"
            value={newEmployee.estado}
            onChange={(e) => setNewEmployee({ ...newEmployee, estado: e.target.value })}
          />
          <TextField
            margin="dense"
            id="cuenta_id"
            label="Cuenta ID"
            fullWidth
            variant="outlined"
            value={newEmployee.cuenta_id}
            onChange={(e) => setNewEmployee({ ...newEmployee, cuenta_id: e.target.value })}
          />
          <TextField
            margin="dense"
            id="cargo"
            label="Cargo"
            fullWidth
            variant="outlined"
            value={newEmployee.cargo}
            onChange={(e) => setNewEmployee({ ...newEmployee, cargo: e.target.value })}
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
export default EmployeesCrud;