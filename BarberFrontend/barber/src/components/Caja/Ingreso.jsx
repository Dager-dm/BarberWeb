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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";
import ArqueoService from "../../services/ArqueoService";

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

function IngresosCrud() {
  const theme = useTheme();

  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [newIngreso, setNewIngreso] = React.useState({
    valor: "",
    descripcion: "",
    fecha: "",
  });
  const [errors, setErrors] = React.useState({});

  // Cargar ingresos desde el backend
  const fetchIngresos = async () => {
    const ingresos = await ArqueoService.GetIngreso();
    setRows(ingresos);
    console.log("Ingresos cargados:", ingresos);
  };

  React.useEffect(() => {
    fetchIngresos();
  }, []);

  const validate = () => {
    let temp = {};
    temp.valor = newIngreso.valor ? "" : "El valor es obligatorio.";
    temp.descripcion = newIngreso.descripcion ? "" : "La descripción es obligatoria.";
    temp.fecha = newIngreso.fecha ? "" : "La fecha es obligatoria.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleAddIngreso = () => {
    setNewIngreso({
      valor: "",
      descripcion: "",
      fecha: "",
    });
    setErrors({});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewIngreso({
      valor: "",
      descripcion: "",
      fecha: "",
    });
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    // Añadir nuevo ingreso
    await ArqueoService.AddIngreso(newIngreso);
    console.log("Ingreso añadido:", newIngreso);
    handleClose();
    fetchIngresos(); // Recargar la lista de ingresos
  };

  return (
    <div style={{ padding: "16px" }}>
      <StyledButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddIngreso}
        style={{ marginBottom: "16px", textTransform: "none" }}
      >
        Añadir ingreso
      </StyledButton>

      <TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>Valor</TableCell>
        <TableCell>Descripción</TableCell>
        <TableCell>Fecha</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {Array.isArray(rows) && rows.length > 0 ? (
        rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.valor}</TableCell>
            <TableCell>{row.descripcion}</TableCell>
            <TableCell>{row.fecha}</TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={3} style={{ textAlign: "center" }}>
            No hay registros disponibles.
          </TableCell>
        </TableRow>
      )}
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
          Añadir Nuevo Ingreso
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}>
            <TextField
              label="Valor"
              variant="outlined"
              fullWidth
              value={newIngreso.valor}
              error={!!errors.valor}
              helperText={errors.valor}
              onChange={(e) => setNewIngreso({ ...newIngreso, valor: e.target.value })}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              value={newIngreso.descripcion}
              error={!!errors.descripcion}
              helperText={errors.descripcion}
              onChange={(e) => setNewIngreso({ ...newIngreso, descripcion: e.target.value })}
            />
            <TextField
              label="Fecha"
              variant="outlined"
              fullWidth
              type="date"
              value={newIngreso.fecha}
              error={!!errors.fecha}
              helperText={errors.fecha}
              onChange={(e) => setNewIngreso({ ...newIngreso, fecha: e.target.value })}
              InputLabelProps={{ shrink: true }}
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
            Añadir
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}

export default IngresosCrud;