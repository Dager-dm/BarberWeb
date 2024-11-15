import '../styles/Login.css';
import React, { useState } from 'react';



function Login() {
    
    const [isActive, setIsActive] = useState(false);
    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    return (
        <div className={`container ${isActive ? "active" : ""}`} id="container">
            <div className="form-container sign-up">
                <form>
                    <h1>Registro</h1>
                    <span></span>
                    <input type="text" placeholder="Nombre" />
                    <input type="email" placeholder="Correo" />
                    <input type="password" placeholder="Contraseña" />
                    <button type="button">Registrarse</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form>
                    <h1>Inicio de Sesion</h1>
                    <span></span>
                    <input type="email" placeholder="Correo" />
                    <input type="password" placeholder="Contraseña" />
                    <button type="button">Iniciar Sesion</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>¡Bienvenido de nuevo!</h1>
                        <p>Ingresa tus datos personales para reservar citas y disfrutar de nuestros servicios</p>
                        <button className="hidden" id="login" onClick={handleLoginClick} type="button">Iniciar Sesion</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>¡Bienvenido, amigo!</h1>
                        <p>Regístrate con tus datos personales para reservar citas y disfrutar de todos nuestros servicios</p>
                        <button className="hidden" id="register" onClick={handleRegisterClick} type="button">Registrarse</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
