class LoginService {
  constructor() {
    this.baseURL = "http://localhost:8082";
  }

  /*Iniciar sesión
  static async login(email, password) {

    const l ={
      email: email,
      contraseña: password 
    }

    return await this.validarUsuario(l);
    return {
      success: true,
      token: "abc123xyz", // Simulación del token
      message: "Inicio de sesión exitoso"
    };
  }*/

  // Obtener el usuario actual
  static getCurrentUser() {
    // Método vacío
  }


  async login(email, password) {
    const loginRequest ={
      email: email,
      contraseña: password 
    }
    console.log(loginRequest);
    try {
      const response = await fetch("http://localhost:8082/usuarios/validar", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginRequest)
      });
  
      if (!response.ok) {
        throw new Error(`Error al validar usuario: ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Error al validar usuario:', error);
      throw error;
    }
  }
  

  // Cerrar sesión
  static logout() {
    console.log("Cerrar sesión (vacío)");
    // Aquí puedes agregar la lógica para eliminar el token o cerrar sesión
    // Ejemplo: localStorage.removeItem("authToken");

    // Simulación de respuesta vacía
    return { success: true, message: "Sesión cerrada exitosamente" };
  }
}

export default LoginService;

