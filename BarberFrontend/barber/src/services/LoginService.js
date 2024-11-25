class LoginService {
    static baseUrl = "http://localhost:5000/api/auth"; // Cambia esta URL por la del backend real
  
    // Iniciar sesión
    static async login(email, password) {
      console.log("Iniciar sesión:", { email, password });
      // Aquí puedes agregar la lógica para enviar la solicitud al backend
      // return await axios.post(`${this.baseUrl}/login`, { email, password });
  
      // Simulación de respuesta vacía
      return { 
        success: true, 
        token: "abc123xyz", // Simulación del token
        message: "Inicio de sesión exitoso" 
      };
    }
  
     // Obtener el usuario actual
  static getCurrentUser() {
    // Método vacío
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
  
  