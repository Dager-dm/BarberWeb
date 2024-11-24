import React, { useEffect, useState } from "react";
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
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CitaService from "../../services/CitasService";
import ServicioService from "../../services/ServiceService"; // Supongamos que tienes un servicio para obtener los servicios
//import BarberoService from "../../services/BarberoService"; // Servicio para obtener los barberos
import ClienteService from "../../services/ClientService"; // Servicio para obtener los clientes

function CitasCrud() {
  const [citas, setCitas] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openEditForm, setOpenEditForm] = useState(false); // Estado para manejar el formulario de edición
  const [citaEditada, setCitaEditada] = useState({
    id: "",
    barbero: "",
    cliente: "",
    fecha: "",
    hora: "",
    servicios: [], // Array de servicios seleccionados
  });
  const [servicios, setServicios] = useState([]); // Lista de servicios disponibles
  const [barberos, setBarberos] = useState([]); // Lista de barberos
  const [clientes, setClientes] = useState([]); // Lista de clientes

  // Cargar las citas desde el backend
  const fetchCitas = async () => {
    try {
      const data = await CitaService.getCitas();
      setCitas(data);
    } catch (error) {
      console.error("Error al cargar las citas:", error);
    }
  };

  // Cargar los servicios disponibles
  const fetchServicios = async () => {
    try {
      const data = await ServicioService.getServicios(); // Obtienes la lista de servicios
      setServicios(data);
    } catch (error) {
      console.error("Error al cargar los servicios:", error);
    }
  };

  // Cargar los barberos disponibles
  const fetchBarberos = async () => {
    try {
      const data = await BarberoService.getBarberos(); // Obtienes la lista de barberos
      setBarberos(data);
    } catch (error) {
      console.error("Error al cargar los barberos:", error);
    }
  };

  // Cargar los clientes disponibles
  const fetchClientes = async () => {
    try {
      const data = await ClienteService.getClientes(); // Obtienes la lista de clientes
      setClientes(data);
    } catch (error) {
      console.error("Error al cargar los clientes:", error);
    }
  };

  useEffect(() => {
    fetchCitas();
    fetchServicios(); // Cargar los servicios cuando se monta el componente
    fetchBarberos(); // Cargar los barberos disponibles
    fetchClientes(); // Cargar los clientes disponibles
  }, []);

  // Manejar la edición de cita
  const handleEditCita = (cita) => {
    setCitaEditada(cita); // Establecer los datos de la cita para editar
    setOpenEditForm(true); // Mostrar el formulario de edición
  };

  // Manejar la apertura del diálogo de confirmación
  const handleDeleteOpen = (id) => {
    setDeleteId(id);
    setOpenDialog(true); // Mostrar el diálogo
  };

  // Manejar el cierre del diálogo sin eliminar
  const handleDeleteClose = () => {
    setDeleteId(null);
    setOpenDialog(false); // Cerrar el diálogo
  };

  // Eliminar una cita
  const handleDelete = async () => {
    try {
      await CitaService.deleteCita(deleteId);
      fetchCitas(); // Recargar las citas después de eliminar
      handleDeleteClose(); // Cerrar el diálogo
    } catch (error) {
      console.error("Error al eliminar la cita:", error);
    }
  };

  // Manejar la actualización de una cita (al enviar el formulario de edición)
  const handleSaveEdit = async () => {
    try {
      await CitaService.updateCita(citaEditada); // Actualizar la cita con los nuevos datos
      fetchCitas(); // Recargar las citas
      setOpenEditForm(false); // Cerrar el formulario de edición
    } catch (error) {
      console.error("Error al editar la cita:", error);
    }
  };

  // Manejar los cambios en los servicios seleccionados
  const handleServicioChange = (event) => {
    const { value, checked } = event.target;
    setCitaEditada((prevState) => {
      const serviciosActualizados = checked
        ? [...prevState.servicios, value] // Agregar servicio si está seleccionado
        : prevState.servicios.filter((servicio) => servicio !== value); // Eliminar servicio si se deselecciona

      return { ...prevState, servicios: serviciosActualizados };
    });
  };

  return (
    <div style={{ padding: "16px" }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Barbero</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {citas.map((cita) => (
              <TableRow key={cita.id}>
                <TableCell>{cita.barbero}</TableCell>
                <TableCell>{cita.cliente}</TableCell>
                <TableCell>{cita.fecha}</TableCell>
                <TableCell>{cita.hora}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditCita(cita)} // Llamar al formulario de edición
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDeleteOpen(cita.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialogo de confirmación para eliminar */}
      <Dialog open={openDialog} onClose={handleDeleteClose}>
        <DialogTitle>Confirmar eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que deseas eliminar esta cita? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Formulario de edición */}
      <Dialog open={openEditForm} onClose={() => setOpenEditForm(false)}>
        <DialogTitle>Editar Cita</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Barbero</InputLabel>
            <Select
              value={citaEditada.barbero}
              onChange={(e) => setCitaEditada({ ...citaEditada, barbero: e.target.value })}
            >
              {barberos.map((barbero) => (
                <MenuItem key={barbero.id} value={barbero.id}>
                  {barbero.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Cliente</InputLabel>
            <Select
              value={citaEditada.cliente}
              onChange={(e) => setCitaEditada({ ...citaEditada, cliente: e.target.value })}
            >
              {clientes.map((cliente) => (
                <MenuItem key={cliente.id} value={cliente.id}>
                  {cliente.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Fecha"
            type="date"
            value={citaEditada.fecha}
            onChange={(e) => setCitaEditada({ ...citaEditada, fecha: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            label="Hora"
            type="time"
            value={citaEditada.hora}
            onChange={(e) => setCitaEditada({ ...citaEditada, hora: e.target.value })}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <FormGroup>
            {servicios.map((servicio) => (
              <FormControlLabel
                key={servicio.id}
                control={
                  <Checkbox
                    checked={citaEditada.servicios.includes(servicio.id)}
                    onChange={handleServicioChange}
                    value={servicio.id}
                  />
                }
                label={servicio.nombre}
              />
            ))}
          </FormGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditForm(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSaveEdit} color="secondary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CitasCrud;

