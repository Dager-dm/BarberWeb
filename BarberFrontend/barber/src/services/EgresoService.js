class EgresoService {
  static baseUrl = "http://localhost:5000/api/egresos"; // Cambia esta URL por la del backend real

  // Obtener todos los egresos (vacío por ahora)
  static async getEgresos() {
    // Aquí iría el código para obtener los egresos desde el servidor
    console.log("Obteniendo egresos (simulado)...");
    return []; // Devuelve un arreglo vacío por ahora
  }

  // Crear un nuevo egreso (vacío por ahora)
  static async createEgreso(egreso) {
    // Aquí iría el código para crear un nuevo egreso en el servidor
    console.log("Egreso añadido (simulado):", egreso);
    return egreso; // Devuelve el egreso que se está "creando"
  }
}

export default EgresoService;
