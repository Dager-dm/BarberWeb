import React, { useState, useEffect } from "react";
import EmployeeService from "../CrudAdmin/Services/EmployeeService"; // Importa el servicio
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
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
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
  textTransform: 'none', // Desactivar mayúsculas
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

function EmployeesCrud() {
  const theme = useTheme();

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
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  // Evento para añadir nuevo empleado
  const handleAddEmployee = () => {
    setEditing(false);
    setNewEmployee({ cedula: "", name: "", phone: "", cargo: "" });
    setErrors({});
    setOpen(true);
  };

  // Evento para cerrar el modal
  const handleClose = () => {
    setOpen(false);
    setNewEmployee({ cedula: "", name: "", phone: "", cargo: "" });
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
        color="primary"
        onClick={handleAddEmployee}
        style={{ marginBottom: "16px" }}
      >
        Añadir Empleado
      </Button>

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
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.phone}</TableCell>
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

      <StyledDialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
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
          Confirmar Eliminación
        </DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar este empleado?
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
export default EmployeesCrud;