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

function EmployeesCrud() {
  const theme = useTheme();

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [employeeToDelete, setEmployeeToDelete] = React.useState(null);
  const [newEmployee, setNewEmployee] = React.useState({
    cedula: "",
    name: "",
    phone: "",
    cargo: "",
  });
  const [editing, setEditing] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  // Vacío: cargar empleados desde el backend
  const fetchEmployees = async () => {
    // Aquí se implementará la lógica para obtener los empleados del backend.
    console.log("Cargar empleados (vacío)");
  };

  React.useEffect(() => {
    fetchEmployees();
  }, []);

  const validate = () => {
    let temp = {};
    temp.cedula = newEmployee.cedula ? "" : "La cédula es obligatoria.";
    temp.name = newEmployee.name ? "" : "El nombre es obligatorio.";
    temp.phone = newEmployee.phone ? "" : "El teléfono es obligatorio.";
    temp.cargo = newEmployee.cargo ? "" : "El cargo es obligatorio.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleAddEmployee = () => {
    setEditing(false);
    setNewEmployee({
      cedula: "",
      name: "",
      phone: "",
      cargo: "",
    });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewEmployee({
      cedula: "",
      name: "",
      phone: "",
      cargo: "",
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    if (editing) {
      // Vacío: actualizar empleado
      console.log("Actualizar empleado (vacío):", newEmployee);
    } else {
      // Vacío: añadir nuevo empleado
      console.log("Añadir empleado (vacío):", newEmployee);
    }
    handleClose();
  };

  const handleEdit = (cedula) => {
    const employeeToEdit = rows.find((row) => row.cedula === cedula);
    setNewEmployee(employeeToEdit);
    setEditing(true);
    setErrors({});
    setOpen(true);
  };

  const handleDelete = (cedula) => {
    setEmployeeToDelete(cedula);
    setOpenConfirm(true);
  };

  const confirmDelete = async () => {
    // Vacío: eliminar empleado
    console.log("Eliminar empleado (vacío):", employeeToDelete);
    setOpenConfirm(false);
  };

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
        style={{ marginBottom: "16px" }}
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
              label="Nombre del Empleado"
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
            <TextField
              label="Cargo"
              variant="outlined"
              fullWidth
              value={newEmployee.cargo}
              error={!!errors.cargo}
              helperText={errors.cargo}
              onChange={(e) => setNewEmployee({ ...newEmployee, cargo: e.target.value })}
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
          ¿Estás seguro de que deseas eliminar este empleado?
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

export default EmployeesCrud;

