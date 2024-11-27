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

const ArqService = new ArqueoService();

function Egresos() {
  const theme = useTheme();
  const [rows, setRows] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [newEgreso, setNewEgreso] = React.useState({
    valor: "",
    descripcion: "",
    fecha: "",
  });
  const [errors, setErrors] = React.useState({});

  // Cargar egresos desde el backend
  const fetchEgresos = async () => {
    const egresos = await ArqService.getOpenArqueo();
    setRows(egresos.egresos);
    console.log("Egresos cargados:", egresos.egresos);
  };

  React.useEffect(() => {
    fetchEgresos();
  }, []);

  const validate = () => {
    let temp = {};
    temp.valor = newEgreso.valor ? "" : "El valor es obligatorio.";
    temp.descripcion = newEgreso.descripcion ? "" : "La descripción es obligatoria.";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const handleAddEgreso = async() => {
    setNewEgreso({
      valor: "",
      descripcion: "",
      fecha: new Date(),
    });
    setErrors({});
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
    setNewEgreso({
      valor: "",
      descripcion: "",
      fecha: "",
    });
    setErrors({});
  };

  const handleSubmit = async () => {

    if (!validate()) return;

    console.log("dentro del evento")
    // Añadir nuevo egreso
   console.log( await ArqService.SetEgreso(newEgreso));
    console.log("Egreso añadido:", newEgreso);
    handleClose();
    fetchEgresos(); // Recargar la lista de egresos
  };

  return (
    <div style={{ padding: "16px" }}>
      <StyledButton
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleAddEgreso}
        style={{ marginBottom: "16px", textTransform: "none" }}
      >
        Añadir egreso
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
          Añadir Nuevo Egreso
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: 2 }}>
            <TextField
              label="Valor"
              variant="outlined"
              fullWidth
              value={newEgreso.valor}
              error={!!errors.valor}
              helperText={errors.valor}
              onChange={(e) => setNewEgreso({ ...newEgreso, valor: e.target.value })}
            />
            <TextField
              label="Descripción"
              variant="outlined"
              fullWidth
              value={newEgreso.descripcion}
              error={!!errors.descripcion}
              helperText={errors.descripcion}
              onChange={(e) => setNewEgreso({ ...newEgreso, descripcion: e.target.value  })}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
        <StyledButtonCancel onClick={handleClose} style={{ marginRight: "10px" }}>
            Cancelar
          </StyledButtonCancel>
          <StyledButtonSave onClick={handleSubmit}>
           Guardar
          </StyledButtonSave>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}

export default Egresos;
