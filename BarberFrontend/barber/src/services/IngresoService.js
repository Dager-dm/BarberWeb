class IngresoService {
    static baseUrl = "http://localhost:5000/api/ingresos"; // Cambia esta URL por la del backend real
  
    // Obtener todos los ingresos
    static async getIngresos() {
      console.log("Obteniendo ingresos (vacío)");
      return []; // Retorna una lista vacía por ahora
    }
  
    // Crear un nuevo ingreso
    static async createIngreso(ingreso) {
      console.log("Añadiendo ingreso (vacío):", ingreso);
      return ingreso; // Retorna el ingreso como ejemplo
    }
  }
  
  export default IngresoService;
  