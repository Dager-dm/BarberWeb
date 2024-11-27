import React from 'react';
import Administrador from './pages/Administrador';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cajero from './pages/Cajero';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/Administrador" element={<Administrador />} /> 
        <Route path="/Cajero" element={<Cajero />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
