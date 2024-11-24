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
  }
  
  export default ArqueoService;
  