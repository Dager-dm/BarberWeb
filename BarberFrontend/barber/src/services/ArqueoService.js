class ArqueoService {
  constructor() {
    this.baseURL = "http://localhost:8082";
    this.OpenArqueo = null;
  }

  static transformArqueoData(Arqueo) {

    console.log(Arqueo);

    const ArqueoData = {
      fechaInicio: new Date(), // Puedes cambiar esto a la fecha actual si lo necesitas dinámico
      saldoBase: Arqueo.saldoBase, // Ajusta según sea necesario
      totalEgreso: 0,
      saldoPrevisto:Arqueo.saldoBase,
      totalIngreso: 0,
      estado: "Habilitado",
      cajero: {
        id: Arqueo.cajero.id, // Asegúrate de que tu objeto Arqueo tenga este campo
        nombre: Arqueo.cajero.nombre,
        telefono: Arqueo.cajero.telefono,
        cedula: Arqueo.cajero.cedula,
        estado: "Habilitado",
        cargo: Arqueo.cajero.cargo,
        usuario: {
          id: Arqueo.cajero.usuario.id, // Ajusta según sea necesario
          contraseña: Arqueo.cajero.usuario.contraseña, // Considera la seguridad aquí
          correo: Arqueo.cajero.usuario.correo, // Ajusta según sea necesario
          tipocuenta: Arqueo.cajero.usuario.tipocuenta,
          estado: "Habilitado"
        }
      }
    };
    return ArqueoData;
  }

  static transformArqueoCloseData(Arqueo) {
    const ArqueoData = {
      fechaCierre: new Date(), // Puedes cambiar esto a la fecha actual si lo necesitas dinámico
      saldoReal: Arqueo.finalBalance,
      observacion: Arqueo.observation
    };
    return ArqueoData;
  }

  static createArqueoCortesData(dataToSend) {
    const ArqueoData = {
      cortes: [
        {
          valor: dataToSend.total,
          fecha: dataToSend.date,
          cliente: {
            id: dataToSend.client.id,
            nombre: dataToSend.client.nombre,
            telefono: dataToSend.client.telefono,
            cedula: dataToSend.client.cedula,
            estado: dataToSend.client.estado
          },
          detalles: dataToSend.services.map(service => ({
             subtotal: service.precio, 
             servicios: [ 
              { id: service.id, 
                duracion: service.duracion, 
                precio: service.precio, 
                nombre: service.nombre, 
                estado: service.estado
               }
             ] 
            })), 
            formapago: dataToSend.paymentMethod === "efectivo" ? "Efectivo" : "Transferencia"
        } 
      ] 
    }; 
    return ArqueoData; 
  }

  async SetCorte(data) {
    const Arqueo = ArqueoService.createArqueoCortesData(data);
    console.log(JSON.stringify(Arqueo));
    return await this.SetMovimientos(Arqueo);
  }

  async SetEgreso(data) {
    const arqueo ={
     egresos: [
       {
        valor: data.valor,
        descripcion: data.descripcion,
        fecha: data.fecha
       }
     ]

    }
    console.log(JSON.stringify(arqueo));
    return await this.SetMovimientos(arqueo);
  }

  async SetIngreso(data) {
    const arqueo ={
     ingresos: [
       {
        valor: data.valor,
        descripcion: data.descripcion,
        fecha: data.fecha
       }
     ]

    }
    console.log(JSON.stringify(arqueo));
    return await this.SetMovimientos(arqueo);
  }

  async getHistorial() {
    try {
      const response = await fetch(`${this.baseURL}/arqueos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching Arqueos:', error);
      throw error;
    }
  }

  async getOpenArqueo() {
    try {
      const response = await fetch(`${this.baseURL}/arqueos/abierto`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching Arqueos:', error);
      throw error;
    }
  }

  async addArqueo(ArqueoN) {
    const Arqueo = ArqueoService.transformArqueoData(ArqueoN);
    try {
      const response = await fetch(`${this.baseURL}/arqueos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Arqueo)
      });
      this.OpenTurno = await response.json();
      return this.OpenTurno;
    } catch (error) {
      console.error('Error adding Arqueo:', error);
      throw error;
    }
  }

  async SetMovimientos(Arqueo) {
    const Arqueoid = await this.getOpenArqueo();
    try {
      const response = await fetch("http://localhost:8082/arqueos/" + Arqueoid.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Arqueo)
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating Arqueo with ID ${Arqueoid.id}:`, error);
      throw error;
    }
  }

  async CloseArqueo(Arqueo) {
    const ArqueoC = ArqueoService.transformArqueoCloseData(Arqueo);
    const arqueo= await this.getOpenArqueo();
    try {
      const response = await fetch("http://localhost:8082/arqueos/close/" + arqueo.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ArqueoC)
      });
      return await response.json();
    } catch (error) {
      console.error(`Error updating Arqueo with ID:`, error);
      throw error;
    }
  }

  async getcajeros() {
    try {
      const response = await fetch(`${this.baseURL}/cajeros`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return await response.json();
    } catch (error) {
      console.error('Error fetching Arqueos:', error);
      throw error;
    }
  }

}

export default ArqueoService;
