
class ServiceService {
  constructor() {
    this.baseURL = "http://localhost:8082";
  }
  static transformserviceData(service) {
    var d = this.convertirMinutosADuration(service.duration);
    return {
      nombre: service.name,
      precio: service.price,
      estado: "Habilitado",
      duracion: d
    };
  }

  static convertirMinutosADuration(minutos) {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `PT${horas}H${minutosRestantes}M`;
  }

  async getServices() {
    try {
      const response = await fetch(`${this.baseURL}/servicios`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching services:', error);
      throw error;
    }
  }

  async getServiceeById(serviceeId) {
    try {
      const response = await fetch(`${this.baseURL}/servicios/${serviceeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error(`Error fetching service with ID ${serviceeId}:`, error);
      throw error;
    }
  }

  async addService(service) {
    const servicee = ServiceService.transformserviceData(service);
    try {
      const response = await fetch(`${this.baseURL}/servicios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicee)
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding service:', error);
      throw error;
    }
  }

  async updateService(service) {
    //const id = Number(servicee.id);
    const servicee = ServiceService.transformserviceData(service);
    try {
      const response = await fetch("http://localhost:8082/servicios/" + service.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(servicee)
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating service with ID ${servicee}:`, error);
      throw error;
    }
  }

  async deleteService(servicee) {
    const id = Number(servicee);
    try {
      const response = await fetch(`${this.baseURL}/servicios/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Verificar si la respuesta es JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        const text = await response.text();
        console.log(text); // Manejar la respuesta de texto
        return { message: text };
      }
    } catch (error) {
      console.error(`Error deleting service with ID ${servicee}:`, error);
      throw error;
    }
  }

}

export default ServiceService;
