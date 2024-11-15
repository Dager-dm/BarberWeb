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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ServicesTable() {
  // Ejemplo de datos de la tabla
  const [rows, setRows] = React.useState([
    { id: 1, name: "Corte de cabello", price: "$10" },
    { id: 2, name: "Afeitado", price: "$8" },
    { id: 3, name: "Tinte", price: "$15" },
  ]);

  // Función para manejar el evento de añadir
  const handleAddService = () => {
    console.log("Añadir nuevo servicio");
    // Aquí puedes abrir un modal, formulario, etc.
  };

  // Función para manejar la eliminación de una fila
  const handleDelete = (id) => {
    const updatedRows = rows.filter((row) => row.id !== id);
    setRows(updatedRows);
  };

  // Función para manejar la edición de una fila
  const handleEdit = (id) => {
    console.log("Editar servicio con ID:", id);
    // Aquí puedes abrir un modal o formulario pre-rellenado.
  };

  return (
    <div style={{ padding: "16px" }}>
      {/* Botón para añadir */}
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
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell> {/* Nueva columna */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.price}</TableCell>
                <TableCell>
                  {/* Botones de acción */}
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(row.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
