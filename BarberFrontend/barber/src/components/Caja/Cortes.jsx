import React, { useState, useEffect } from "react";
import {
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
  Button,
  Box,
  Typography,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { styled } from "@mui/system";
import useTheme from "@mui/material/styles/useTheme";
import ArqueoService from "../../services/ArqueoService"; // Asegúrate de que el servicio esté correctamente importado
import ServiceService from "../../services/ServiceService";

const StyledDialog = styled(Dialog)({
  "& .MuiDialog-paper": {
    borderRadius: "20px",
    padding: "24px",
    background: "linear-gradient(to right, #ffffff, #f7f9fc)",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
  },
});

function Cortes() {
  const theme = useTheme();
  const [rows, setRows] = useState([]); // Estado para almacenar los cortes
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedCut, setSelectedCut] = useState(null);
  const SeService = new ServiceService();
  const ArqService = new ArqueoService();
  // Cargar cortes desde el backend
  const fetchCuts = async () => {
    try {
      const cuts = await ArqService.getOpenArqueo(); // Asegúrate de que este método exista en ArqueoService
      setRows(cuts.cortes); // Actualiza el estado con los datos recibidos
      console.log("Cortes cargados:", cuts.cortes);
    } catch (error) {
      console.error("Error al cargar los cortes:", error);
    }
  };

  useEffect(() => {
    fetchCuts(); // Llama a fetchCuts al montar el componente
  }, []);

  // Función para abrir el diálogo de detalles
  const handleViewDetails = (cut) => {
    setSelectedCut(cut); // Establece el corte seleccionado
    setOpenDetails(true); // Abre el diálogo
  };

  // Función para cerrar el diálogo de detalles
  const handleCloseDetails = () => {
    setOpenDetails(false); // Cierra el diálogo
    setSelectedCut(null); // Limpia el corte seleccionado
  };

  return (
    <div style={{ padding: "16px" }}>
     <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Detalles</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(rows) && rows.length > 0 ? (
            rows.map((row) => (
              <TableRow key={row.id || row._id}> {/* Usa un id único para cada fila */}
                <TableCell>{row.cliente.nombre || "Desconocido"}</TableCell> {/* Validación de cliente */}
                <TableCell>
                  ${row.valor ? row.valor.toFixed(2) : "0.00"} {/* Validación de valorTotal */}
                </TableCell>
                <TableCell>
                  {row.fecha
                    ? new Date(row.fecha).toLocaleDateString()
                    : "Fecha no disponible"} {/* Validación de fecha */}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewDetails(row)}
                  >
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: "center" }}>
                No hay registros disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>

      {/* Diálogo para mostrar detalles del corte */}
      <StyledDialog
        open={openDetails}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: theme.palette.mode === "dark" ? "#fff" : "#000",
          }}
        >
          Detalles del Corte
        </DialogTitle>
        <DialogContent>
          {selectedCut && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                paddingTop: 2,
              }}
            >
              <Typography>
                <strong>Cliente:</strong> {selectedCut.cliente.nombre}
              </Typography>
              <Typography>
                <strong>Valor Total:</strong> ${selectedCut.valor.toFixed(2)}
              </Typography>
              <Typography>
                <strong>Fecha:</strong>{" "}
                {new Date(selectedCut.fecha).toLocaleDateString()}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", padding: 2 }}>
          <Button
            onClick={handleCloseDetails}
            variant="outlined"
            color="secondary"
            style={{ textTransform: "none" }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}

export default Cortes;
