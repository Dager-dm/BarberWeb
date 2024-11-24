class CitaService {
    static baseUrl = "http://localhost:5000/api/citas"; // Cambia esta URL por la del backend real
  
    // Obtener todas las citas
    static async getCitas() {
      console.log("Cargar citas (vacío)");
      return []; // Retorna una lista vacía por ahora
    }
  
    // Obtener una cita por ID
    static async getCitaById(id) {
      console.log("Obtener cita (vacío) por ID:", id);
      return {}; // Retorna un objeto vacío por ahora
    }
  
    // Crear una nueva cita
    static async createCita(cita) {
      console.log("Añadir cita (vacío):", cita);
      return cita; // Retorna la cita como ejemplo
    }
  
    // Actualizar una cita
    static async updateCita(cita) {
      console.log("Actualizar cita (vacío):", cita);
      return cita; // Retorna la cita actualizada como ejemplo
    }
  
    // Eliminar una cita
    static async deleteCita(id) {
      console.log("Eliminar cita (vacío):", id);
      return { id }; // Retorna el ID de la cita eliminada como ejemplo
    }
  }
  
  export default CitaService;
  