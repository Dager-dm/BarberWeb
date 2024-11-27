
class EmployeeService {
    constructor() {
        this.baseURL = "http://localhost:8082";
    }
    static transformEmployeeData(Employee) {
        const employeeData = {
            nombre: Employee.name,
            telefono: Employee.phone,
            cedula: Employee.cedula,
            estado: "Habilitado",
            cargo: Employee.cargo
        };
        // Asignar el objeto usuario solo si el cargo es "cajero"
        if (Employee.cargo === "Cajero") {
            employeeData.usuario = {
                correo: Employee.email,
                contraseña: Employee.password,
                tipocuenta: "empleado",
                estado: "Habilitado"
            };
        }
        return employeeData;
    }


    async getEmployees() {
        try {
            const response = await fetch(`${this.baseURL}/empleados`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching Employees:', error);
            throw error;
        }
    }

    async getEmployeeById(EmployeeId) {
        try {
            const response = await fetch(`${this.baseURL}/empleados/${EmployeeId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error(`Error fetching Employee with ID ${EmployeeId}:`, error);
            throw error;
        }
    }

    async addEmployee(Employee) {
        const Employeee = EmployeeService.transformEmployeeData(Employee);
        const cargo = (Employee.cargo == 'Cajero') ? 'cajeros' : 'barberos';
        try {
            const response = await fetch(`${this.baseURL}/${cargo}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Employeee)
            });
            return await response.json();
        } catch (error) {
            console.error('Error adding Employee:', error);
            throw error;
        }
    }

    async updateEmployee(Employee) {
        const Employeee = EmployeeService.transformEmployeeData(Employee);
        const cargo = (Employee.cargo == 'Cajero') ? 'cajeros' : 'barberos';
        try {
            const response = await fetch("http://localhost:8082/" + cargo + "/" + Employee.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Employeee)
            });
            return await response.json();
        } catch (error) {
            console.error(`Error updating Employee with ID ${Employeee}:`, error);
            throw error;
        }
    }

    async deleteEmployee(Employee) {
        const Employeee = EmployeeService.transformEmployeeData(Employee);
        const cargo = (Employee.cargo == 'Cajero') ? 'cajeros' : 'barberos';
        try {
            const response = await fetch(`${this.baseURL}/${cargo}/${Employee.id}`, {
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
            console.error(`Error deleting Employee with ID ${Employeee}:`, error);
            throw error;
        }
    }

    async getCashiers() {
        try {
            const response = await fetch(`${this.baseURL}/cajeros`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching Employees:', error);
            throw error;
        }
    }




}

export default EmployeeService;
