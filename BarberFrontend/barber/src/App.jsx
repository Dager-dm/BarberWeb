import React from 'react';
import Administrador from './pages/Administrador';
import Cliente from './pages/Cliente';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cajero from './pages/Cajero';
import ArqueodeCaja from './components/Caja/ArqueodeCaja';

function App() {

  return (
    <Router>
      <Routes>
        {/* Definir la ruta principal*/}
        <Route path="/" element={<Cajero/>} />
      </Routes>
    </Router>
  )
}

export default App
