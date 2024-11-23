
class ClientService {
    constructor() {
        this.baseURL = "http://localhost:8082";
    }
    static transformClientData(client) {
         return { 
            nombre: client.name, 
            telefono: client.phone, 
            cedula: client.cedula, 
            estado: "Habilitado",
            usuario: { 
                correo: client.email, 
                contraseña: client.password, 
                tipocuenta: "cliente" ,
                estado: "Habilitado"
            } 
        }; 
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

    async addCliente(client) {
       
        const cliente = ClientService.transformClientData(client);
        console.log("console log cliente:"+cliente)
        console.log("console log json:"+JSON.stringify(cliente));
        console.log("console log client:"+client);
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

    async updateCliente(client) {
        //const id = Number(cliente.id);
        const cliente = ClientService.transformClientData(client);
        try {
            const response = await fetch("http://localhost:8082/clientes/"+client.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            });
            return await response.json();
        } catch (error) {
            console.error(`Error updating client with ID ${cliente}:`, error);
            throw error;
        }
    }

    async deleteCliente(cliente) {
        const id = Number(cliente);
        try {
            const response = await fetch(`${this.baseURL}/clientes/${id}`, {
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
            console.error(`Error deleting client with ID ${cliente}:`, error);
            throw error;
        }
    }
    
}

export default ClientService;
