
import React, { useState } from "react";

function Login() {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => setIsActive(true);
  const handleLoginClick = () => setIsActive(false);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-gray-200 to-indigo-200"
    >
      <div
        className={`relative bg-white rounded-3xl shadow-lg overflow-hidden w-[768px] max-w-full min-h-[480px] transition-all duration-700`}
      >
        {/* Formulario de Registro */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-700 ${
            isActive ? "opacity-100 z-10 translate-x-full" : "opacity-0 z-0"
          }`}
        >
          <form className="flex flex-col items-center justify-center px-10">
            <h1 className="text-2xl font-bold mb-2">Registro</h1>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              placeholder="Correo"
              className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
              Registrarse
            </button>
          </form>
        </div>

        {/* Formulario de Inicio de Sesión */}
        <div
          className={`absolute top-0 left-0 w-1/2 h-full flex flex-col items-center justify-center transition-all duration-700 ${
            isActive ? "opacity-0 z-0" : "opacity-100 z-10"
          }`}
        >
          <form className="flex flex-col items-center justify-center px-10">
            <h1 className="text-2xl font-bold mb-2">Inicio de Sesión</h1>
            <input
              type="email"
              placeholder="Correo"
              className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full p-2 mb-4 bg-gray-200 rounded-md outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700">
              Iniciar Sesión
            </button>
          </form>
        </div>

        {/* Panel de Alternancia */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full bg-gradient-to-r from-red-400 to-red-700 text-white flex items-center justify-center flex-col transition-all duration-700 ${
            isActive ? "transform -translate-x-full" : "transform translate-x-0"
          }`}
        >
          <div
            className={`absolute w-full h-full flex flex-col items-center justify-center text-center p-8 transition-all duration-700`}
          >
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