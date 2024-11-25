import React, { useState, useEffect } from "react";
import EmployeeService from "../../services/EmployeeService"; // Importa el servicio
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/system";

const StyledButton = styled(Button)({
  background: "linear-gradient(to right, #2575fc, #6a11cb)",
  color: "#fff",
  padding: "10px 20px",
  fontWeight: "bold",
  borderRadius: "25px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  textTransform: 'none',
  "&:hover": {
    background: "linear-gradient(to right, #1f60d0, #5a0dba)",
  },
});

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    padding: 16,
    background: "linear-gradient(to right, #ffffff, #f7f9fc)",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
});

function EmployeesCrud() {
  // Estado del componente
  const [rows, setRows] = useState([]); // Lista de empleados
  const [open, setOpen] = useState(false); // Modal de añadir/editar
  const [openConfirm, setOpenConfirm] = useState(false); // Modal de confirmación de eliminación
  const [employeeToDelete, setEmployeeToDelete] = useState(null); // Empleado a eliminar
  const [newEmployee, setNewEmployee] = useState({
    cedula: "",
    name: "",
    phone: "",
    cargo: "",
    email: "",
    password: "",
  }); // Nuevo empleado
  const [editing, setEditing] = useState(false); // Si estamos editando o creando un nuevo empleado
  const [errors, setErrors] = useState({}); // Errores de validación

  // Cargar empleados al cargar el componente
  useEffect(() => {
    const fetchEmployees = async () => {
      const employees = await EmployeeService.getEmployees();
      setRows(employees);
    };
    fetchEmployees();
  }, []);

  // Validar campos del formulario
  const validate = () => {
    let temp = {};
    temp.cedula = newEmployee.cedula ? "" : "La cédula es obligatoria.";
    temp.name = newEmployee.name ? "" : "El nombre es obligatorio.";
    temp.phone = newEmployee.phone ? "" : "El teléfono es obligatorio.";
    temp.cargo = newEmployee.cargo ? "" : "El cargo es obligatorio.";
    if (newEmployee.cargo === "Cajero") {
      temp.email = newEmployee.email ? "" : "El correo es obligatorio.";
      temp.password = newEmployee.password ? "" : "La contraseña es obligatoria.";
    }
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  // Evento para añadir nuevo empleado
  const handleAddEmployee = () => {
    setEditing(false);
    setNewEmployee({ cedula: "", name: "", phone: "", cargo: "", email: "", password: "" });
    setErrors({});
    setOpen(true);
  };

  // Evento para cerrar el modal
  const handleClose = () => {
    setOpen(false);
    setNewEmployee({ cedula: "", name: "", phone: "", cargo: "", email: "", password: "" });
    setErrors({});
  };

  // Evento para guardar un empleado (nuevo o editado)
  const handleSubmit = async () => {
    if (!validate()) return;

    if (editing) {
      await EmployeeService.updateEmployee(newEmployee);
    } else {
      await EmployeeService.createEmployee(newEmployee);
    }

    // Refrescar la lista de empleados
    const updatedEmployees = await EmployeeService.getEmployees();
    setRows(updatedEmployees);
    handleClose();
  };

  // Evento para editar un empleado
  const handleEdit = (cedula) => {
    const employeeToEdit = rows.find((row) => row.cedula === cedula);
    setNewEmployee(employeeToEdit);
    setEditing(true);
    setErrors({});
    setOpen(true);
  };

  // Evento para eliminar un empleado
  const handleDelete = (cedula) => {
    setEmployeeToDelete(cedula);
    setOpenConfirm(true);
  };

  // Confirmar la eliminación del empleado
  const confirmDelete = async () => {
    await EmployeeService.deleteEmployee(employeeToDelete);
    const updatedEmployees = await EmployeeService.getEmployees();
    setRows(updatedEmployees);
    setOpenConfirm(false);
  };

  // Cancelar la eliminación
  const cancelDelete = () => {
    setOpenConfirm(false);
    setEmployeeToDelete(null);
  };

  return (
    <div style={{ padding: "16px" }}>
        <StyledButton
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddEmployee}
          style={{ textTransform: "none" }}
        >
          Añadir Empleado
        </StyledButton>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Cédula</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Cargo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.cedula}>
                <TableCell>{row.cedula}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.cargo}</TableCell>
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
          }}
        >
          {editing ? "Editar Empleado" : "Añadir Nuevo Empleado"}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}>
            <TextField
              label="Cédula"
              variant="outlined"
              fullWidth
              value={newEmployee.cedula}
              error={!!errors.cedula}
              helperText={errors.cedula}
              onChange={(e) => setNewEmployee({ ...newEmployee, cedula: e.target.value })}
            />
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={newEmployee.name}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
            <TextField
              label="Teléfono"
              variant="outlined"
              fullWidth
              value={newEmployee.phone}
              error={!!errors.phone}
              helperText={errors.phone}
              onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
            />
            <FormControl fullWidth error={!!errors.cargo}>
              <InputLabel>Cargo</InputLabel>
              <Select
                value={newEmployee.cargo}
                onChange={(e) => setNewEmployee({ ...newEmployee, cargo: e.target.value })}
                label="Cargo"
              >
                <MenuItem value="Barbero">Barbero</MenuItem>
                <MenuItem value="Cajero">Cajero</MenuItem>
              </Select>
              {errors.cargo && <p style={{ color: "red" }}>{errors.cargo}</p>}
            </FormControl>

            {/* Mostrar campos de correo y contraseña solo si el cargo es Cajero */}
            {newEmployee.cargo === "Cajero" && (
              <>
                <TextField
                  label="Correo"
                  variant="outlined"
                  fullWidth
                  value={newEmployee.email}
                  error={!!errors.email}
                  helperText={errors.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                />
                <TextField
                  label="Contraseña"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={newEmployee.password}
                  error={!!errors.password}
                  helperText={errors.password}
                  onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
                />
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
          <StyledButton onClick={handleSubmit}>
            {editing ? "Actualizar" : "Guardar"}
          </StyledButton>
        </DialogActions>
      </StyledDialog>

      <Dialog open={openConfirm} onClose={cancelDelete}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que quieres eliminar este empleado?
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="inherit">
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

export default EmployeesCrud;