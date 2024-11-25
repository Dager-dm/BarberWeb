class ClientService {
    static baseUrl = "http://localhost:5000/api/clients"; // Cambia esta URL por la del backend real
  
    // Obtener todos los clientes
    static async getClients() {
      console.log("Cargar clientes (vacío)");
      return []; // Retorna una lista vacía por ahora
    }
  
    // Obtener un cliente por cédula
    static async getClientByCedula(cedula) {
      console.log("Obtener cliente (vacío) por cédula:", cedula);
      return {}; // Retorna un objeto vacío por ahora
    }
  
    // Crear un nuevo cliente
    static async createClient(client) {
      console.log("Añadir cliente (vacío):", client);
      return client; // Retorna el cliente como ejemplo
    }
  
    // Actualizar un cliente
    static async updateClient(client) {
      console.log("Actualizar cliente (vacío):", client);
      return client; // Retorna el cliente actualizado como ejemplo
    }
  
    // Eliminar un cliente
    static async deleteClient(cedula) {
      console.log("Eliminar cliente (vacío):", cedula);
      return { cedula }; // Retorna el cedula del cliente eliminado como ejemplo
    }

    
  }
  
  export default ClientService;
  