import React from 'react';
import Administrador from './pages/Administrador';
import Cliente from './pages/Cliente';
import Login from './pages/Login';
import CitasCliente from './components/CitasCliente';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cajero from './pages/Cajero';

function App() {

  return (
    <Router>
      <Routes>
        {/* Definir la ruta principal*/}
        <Route path="/" element={<Cajero/>} />
        {/* Definir la ruta para acceder a CitasCliente, donde se manejará añadir o editar citas */}
        <Route path="/citasCliente" element={<CitasCliente />} />
        {/* Si tienes parámetros, por ejemplo para editar, puedes añadir algo como esto */}
        <Route path="/citasCliente/:id" element={<CitasCliente />} />
      </Routes>
    </Router>
  )
}

export default App
