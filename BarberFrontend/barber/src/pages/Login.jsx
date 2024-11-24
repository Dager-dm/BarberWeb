import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginService from '../services/LoginService.js';

function Login() {
  const [isActive, setIsActive] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ cedula: '', nombre: '', telefono: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;
  const validateCedula = (cedula) => cedula.length >= 8 && cedula.length <= 10;
  const validatePhone = (phone) => /^\d{10}$/.test(phone);

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  const validateLoginForm = () => {
    const newErrors = {};
    if (!validateEmail(loginData.email)) newErrors.loginEmail = 'Email inválido';
    if (!validatePassword(loginData.password)) newErrors.loginPassword = 'La contraseña debe tener al menos 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors = {};
    if (!validateCedula(registerData.cedula)) newErrors.cedula = 'Cédula inválida';
    if (!registerData.nombre) newErrors.nombre = 'Nombre requerido';
    if (!validatePhone(registerData.telefono)) newErrors.telefono = 'Teléfono inválido';
    if (!validateEmail(registerData.email)) newErrors.email = 'Email inválido';
    if (!validatePassword(registerData.password)) newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!validateLoginForm()) return;
    
    setIsLoading(true);
    setStatusMessage({ type: '', message: '' });

    const result = await LoginService.login(loginData.email, loginData.password);

    if (result.success) {
      setStatusMessage({ type: 'success', message: 'Inicio de sesión exitoso' });

      switch (result.userType) {
        case 'cliente':
          navigate('/cliente');
          break;
        case 'admin':
          navigate('/Administrador');
          break;
        case 'cajero':
          navigate('/cajero');
          break;
        default:
          setStatusMessage({ type: 'error', message: 'Tipo de cuenta desconocido' });
      }
    } else {
      setStatusMessage({ type: 'error', message: result.error || 'Credenciales incorrectas' });
    }
    setIsLoading(false);
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;

    setIsLoading(true);
    setStatusMessage({ type: '', message: '' });

    const result = await LoginService.registerClient(registerData);

    if (result.success) {
      setStatusMessage({ type: 'success', message: '¡Registro exitoso! Ya puedes iniciar sesión' });
      setTimeout(() => {
        handleLoginClick();
        setRegisterData({ cedula: '', nombre: '', telefono: '', email: '', password: '' });
      }, 2000);
    } else {
      setStatusMessage({ type: 'error', message: result.error });
    }
    setIsLoading(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-gray-200 to-indigo-200">
      <div className={`relative bg-white rounded-3xl shadow-lg overflow-hidden w-[768px] max-w-full min-h-[480px] transition-all duration-700`}>
        
        {/* Formulario de Registro */}
        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-700 ${isActive ? "opacity-100 z-10 translate-x-full" : "opacity-0 z-0"}`}>
          <form onSubmit={handleRegisterSubmit} className="flex flex-col items-center justify-center px-10">
            <h1 className="text-2xl font-bold mb-2">Registro</h1>
            <input type="text" placeholder="Cédula" value={registerData.cedula} onChange={(e) => setRegisterData({ ...registerData, cedula: e.target.value })} className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.cedula && <p className="text-red-500 text-xs mb-2">{errors.cedula}</p>}
            <input type="text" placeholder="Nombre" value={registerData.nombre} onChange={(e) => setRegisterData({ ...registerData, nombre: e.target.value })} className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.nombre && <p className="text-red-500 text-xs mb-2">{errors.nombre}</p>}
            <input type="text" placeholder="Teléfono" value={registerData.telefono} onChange={(e) => setRegisterData({ ...registerData, telefono: e.target.value })} className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.telefono && <p className="text-red-500 text-xs mb-2">{errors.telefono}</p>}
            <input type="email" placeholder="Correo" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.email && <p className="text-red-500 text-xs mb-2">{errors.email}</p>}
            <input type="password" placeholder="Contraseña" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.password && <p className="text-red-500 text-xs mb-2">{errors.password}</p>}
            <button type="submit" disabled={isLoading} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50">
              {isLoading ? "Procesando..." : "Registrarse"}
            </button>
          </form>
        </div>

        {/* Formulario de Inicio de Sesión */}
        <div className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-700 ${isActive ? "opacity-0 z-0" : "opacity-100 z-10"}`}>
          <form onSubmit={handleLoginSubmit} className="flex flex-col items-center justify-center px-10">
            <h1 className="text-2xl font-bold mb-2">Inicio de Sesión</h1>
            <input type="email" placeholder="Correo" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.loginEmail && <p className="text-red-500 text-xs mb-2">{errors.loginEmail}</p>}
            <input type="password" placeholder="Contraseña" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400" />
            {errors.loginPassword && <p className="text-red-500 text-xs mb-2">{errors.loginPassword}</p>}
            <button type="submit" disabled={isLoading} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50">
              {isLoading ? "Procesando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>

        {/* Panel de Alternancia */}
        <div className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-red-400 to-red-700 text-white flex items-center justify-center flex-col transition-all duration-700 ${isActive ? "transform -translate-x-full" : "transform translate-x-0"}`}>
          <div className="absolute w-full h-full flex flex-col items-center justify-center text-center p-8 transition-all duration-700">
            <h1 className="text-3xl font-bold mb-4">
              {isActive ? "¡Bienvenido de nuevo!" : "¡Bienvenido, amigo!"}
            </h1>
            <p className="mb-4 text-sm">
              {isActive
                ? "Ingresa tus datos personales para reservar citas y disfrutar de nuestros servicios"
                : "Regístrate con tus datos personales para reservar citas y disfrutar de todos nuestros servicios"}
            </p>
            <button
              onClick={isActive ? handleLoginClick : handleRegisterClick}
              className="border-2 border-white text-white px-6 py-2 rounded-lg hover:bg-white hover:text-red-700 transition-all"
            >
              {isActive ? "Iniciar Sesión" : "Registrarse"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
