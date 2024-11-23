class ClientController {
    constructor() {
        this.baseURL = "http://localhost:8082";
    }
  
    async getClientes() {
        try {
            const response = await fetch(`${this.baseURL}/clientes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching clients:', error);
            throw error;
        }
    }
  
    async getClienteById(clienteId) {
        try {
            const response = await fetch(`${this.baseURL}/clientes/${clienteId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error(`Error fetching client with ID ${clienteId}:`, error);
            throw error;
        }
    }
  
    async addCliente(cliente) {
        try {
            const response = await fetch(`${this.baseURL}/clientes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding client:', error);
            throw error;
        }
    }
  
    async updateCliente(clienteId, cliente) {
        try {
            const response = await fetch(`${this.baseURL}/clientes/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            return await response.json();
        } catch (error) {
            console.error(`Error updating client with ID ${clienteId}:`, error);
            throw error;
        }
    }
  
    async deleteCliente(clienteId) {
        try {
            const response = await fetch(`${this.baseURL}/clientes/${clienteId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error(`Error deleting client with ID ${clienteId}:`, error);
            throw error;
        }
    }
  }
  export default ClientController