import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/LoginService.js';

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
  const navigate = useNavigate();const Lservice = new LoginService();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    
    setIsLoading(true);
    setStatusMessage({ type: '', message: '' });

    const result = await Lservice.login(loginData.email, loginData.password);

    if (result!=null) {
      setStatusMessage({ type: 'success', message: 'Inicio de sesión exitoso' });

      switch (result.tipocuenta) {
        case 'administrador':
          navigate('/Administrador');
          break;
        case 'empleado':
          navigate('/Cajero');
          break;
        default:
          setStatusMessage({ type: 'error', message: 'Tipo de cuenta desconocido' });
      }
    } else {
      setStatusMessage({ type: 'error', message: result.error || 'Credenciales incorrectas' });
    }
    setIsLoading(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-gray-200 to-indigo-200">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden w-[400px] max-w-full min-h-[300px] p-10">
        <form onSubmit={handleLoginSubmit} className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Inicio de Sesión</h1>
          <input
            type="email"
            placeholder="Correo"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.loginEmail && <p className="text-red-500 text-xs mb-2">{errors.loginEmail}</p>}
          <input
            type="password"
            placeholder="Contraseña"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.loginPassword && <p className="text-red-500 text-xs mb-2">{errors.loginPassword}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? "Procesando..." : "Iniciar Sesión"}
          </button>
          {statusMessage.message && (
            <p className={`mt-4 text-sm ${statusMessage.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {statusMessage.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
