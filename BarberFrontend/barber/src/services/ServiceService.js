
class ServiceService {
    static baseUrl = "http://localhost:5000/api/services"; // Cambia esta URL por la del backend real
  
    // Obtener todos los servicios
    static async getServices() {
      console.log("Cargar servicios (vacío)");
      return []; // Retorna una lista vacía por ahora
    }
  
    // Crear un nuevo servicio
    static async createService(service) {
      console.log("Añadir servicio (vacío):", service);
      return service; // Retorna el mismo servicio como ejemplo
    }
  
    // Actualizar un servicio
    static async updateService(service) {
      console.log("Actualizar servicio (vacío):", service);
      return service; // Retorna el servicio actualizado como ejemplo
    }
  
    // Eliminar un servicio
    static async deleteService(id) {
      console.log("Eliminar servicio (vacío):", id);
      return { id }; // Retorna el id del servicio eliminado como ejemplo
    }
  }
  
  export default ServiceService;
  