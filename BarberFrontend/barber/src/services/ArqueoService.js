class ArqueoService {
    static baseUrl = "http://localhost:5000/api"; // Cambia esto por la URL real de tu backend
  
    // Obtener la lista de cajeros desde el backend
    static async getCashiers() {
      console.log("Obteniendo lista de cajeros...");
      return []; // Devuelve un array vacío por ahora
    }
  
    // Abrir arqueo
    static async openArqueo(arqueo) {
      console.log("Abrir arqueo (vacío):", arqueo);
      return arqueo; // Devuelve el objeto de arqueo como ejemplo
    }
  
    // Cerrar arqueo
    static async closeArqueo(arqueo) {
      console.log("Cerrar arqueo (vacío):", arqueo);
      return arqueo; // Devuelve el objeto de arqueo como ejemplo
    }

  // Registrar un corte (venta de servicio) en el backend
  static async registrarCorte(data) {
    console.log("Registrando corte (vacío):", data);
    return data; // Devuelve los datos enviados como ejemplo
  }

  static async AddIngreso (data) {
    console.log("Agregar Ingreso (vacío):", data);
    return data; 
  }

  static async AddEgreso (data) {
    console.log("Agregar Egreso (vacío):", data);
    return data; 
  }

  static async GetIngreso(data) {
    console.log("Obtener Ingreso (vacío):", data);
    return data; // Devuelve los datos enviados como ejemplo
  }

  static async GetEgreso(data) {
    console.log("Obtener Egreso (vacío):", data);
    return data; // Devuelve los datos enviados como ejemplo
  }

  }
  
  export default ArqueoService;
  