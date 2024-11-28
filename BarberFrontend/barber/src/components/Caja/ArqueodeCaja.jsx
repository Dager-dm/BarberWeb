import React, { useState, useEffect } from 'react';
import { DollarSign, Clock } from 'lucide-react';
import ArqueoService from '../../services/ArqueoService';
import EmployeeService from '../../services/EmployeeService';

function ArqueoDeCaja() {
  const [registers, setRegisters] = useState([]);
  const [cashiers, setCashiers] = useState([]); // Lista de cajeros
  const [selectedCashier, setSelectedCashier] = useState(null); // Cajero seleccionado
  const [initialBalance, setInitialBalance] = useState('');
  const [finalBalance, setFinalBalance] = useState('');
  const [observation, setObservation] = useState('');
  const [currentRegister, setCurrentRegister] = useState(null);
  const EmpService = new EmployeeService();
  const ArqService = new ArqueoService();

  const fetchHistorial = async () => {
    try {
      const historial = await ArqService.getHistorial(); // Método para obtener todos los registros
      setRegisters(historial);
      console.log(historial);
    } catch (error) {
      console.error('Error al obtener historial:', error);
    }
  };

  const formatDateTime = (date) => {
    // Si es una cadena, conviértela a un objeto Date
    if (typeof date === 'string') {
      date = new Date(date);
    }

    // Si no es una instancia de Date válida, devuelve un mensaje predeterminado
    if (!(date instanceof Date) || isNaN(date)) {
      return "Fecha no válida";
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = date.toLocaleDateString(undefined, options);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // La hora 0 debería ser 12
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;

    const timeString = `${hours}:${minutesStr} ${ampm}`;

    return `${dateString}, ${timeString}`;
  };





  const fetchCashiers = async () => {
    try {
      const cashiersList = await EmpService.getCashiers(); // Método para obtener todos los empleados
      setCashiers(cashiersList);
      console.log(cashiersList);
    } catch (error) {
      console.error('Error al obtener cajeros:', error);
    }
  };

  useEffect(() => {
    // Obtener todos los cajeros si es modo administrador


    // Obtener todos los cajeros si es modo administrador
    const fetchHistorial = async () => {
      try {
        const historial = await ArqService.getHistorial(); // Método para obtener todos los empleados
        setRegisters(historial);
        console.log(historial);
      } catch (error) {
        console.error('Error al obtener cajeros:', error);
      }
    };


    // Obtener ingresos y egresos
    const fetchFinancialData = async () => {
      try {
        //const income = await ArqueoService.GetIngreso(); 
        //const expenses = await ArqueoService.GetEgreso(); 
        //setTotalExpenses(expenses);
      } catch (error) {
        console.error('Error al obtener ingresos y egresos:', error);
      }
    };

    fetchCashiers();
    fetchFinancialData();
    fetchHistorial();
    GetOpenArqueo();
  }, []);


  const GetOpenArqueo = async () => {
    try {
      const arqueo = await ArqService.getOpenArqueo();
      if (arqueo !== null && arqueo !== undefined) {
        setCurrentRegister(arqueo);
        setInitialBalance(arqueo.saldoBase);
      }
    } catch (error) {
      console.error('Error al obtener ingresos y egresos:', error);
    }
  };


  const handleOpenRegister = async (e) => {
    e.preventDefault();
    if (!selectedCashier || !initialBalance) return;

    const newRegister = {
      cajero: selectedCashier,
      saldoBase: parseFloat(initialBalance),
      estado: 'Habilitado',
    };

    setRegisters([newRegister, ...registers]);
    await ArqService.addArqueo(newRegister); // Método vacío por ahora
    GetOpenArqueo();
  };

  const handleCloseRegister = async (e) => {
    e.preventDefault();
    if (!currentRegister || !finalBalance) return;

    const expectedBalance = currentRegister.saldoPrevisto;
    const difference = parseFloat(currentRegister.diferencia);

    const updatedRegister = {
      ...currentRegister,
      finalBalance: parseFloat(finalBalance),
      difference,
      observation,
    };

    setRegisters(registers.map((reg) => (reg.id === currentRegister.id ? updatedRegister : reg)));
    setCurrentRegister(null);
    setInitialBalance('');
    setFinalBalance('');
    setObservation('');

    await ArqService.CloseArqueo(updatedRegister); // Método vacío por ahora
    fetchHistorial();



  };

  return (
    <div className="min-h-[70vh] bg-white-100 p-3" style={{ maxHeight: '400px' }}>
      <div className="max-w-7xl mx-auto px-4 py-8" >


        {/* Mostrar todos los cajeros si es modo administrador */}

        <div className="flex gap-8">
          {/* Historial de Arqueos */}
          <div className="w-[70%] bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Historial de Arqueos
            </h2>
            <div
              className="space-y-4 overflow-y-auto"
              style={{ maxHeight: '350px' }} // Limita la altura y permite el scroll
            >
              {registers.map((register) => (
                <div
                  key={register.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-lg">{register.cajero.nombre}</p>
                      <p className="text-sm text-gray-500"> {formatDateTime(new Date(register.fechaCierre))}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${register.estado === 'Habilitado'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}
                    >
                      {register.estado === 'Habilitado' ? 'Abierto' : 'Cerrado'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">Saldo Inicial</p>
                      <p className="font-medium">${register.saldoBase.toLocaleString()}</p>
                    </div>
                    {register.estado === 'Deshabilitado' && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">Saldo Final</p>
                          <p className="font-medium">
                            ${register.saldoReal?.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Diferencia</p>
                          <p className={`font-medium ${register.diferencia && register.diferencia < 0
                            ? 'text-red-600'
                            : 'text-green-600'
                            }`}>
                            ${register.diferencia?.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Saldo Previsto</p>
                          <p className="font-medium">
                            ${register.saldoPrevisto?.toLocaleString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-600">Observaciones</p>
                          <p className="font-medium">
                            {register.observacion}
                          </p>
                        </div>

                      </>
                    )}
                  </div>
                </div>
              ))}
              {registers.length === 0 && <p className="text-gray-500 text-center py-8">No hay arqueos registrados</p>}
            </div>
          </div>


          {/* Formulario de Arqueo */}
          <div className="w-[30%] bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              {currentRegister ? 'Cerrar Arqueo' : 'Iniciar Arqueo'}
            </h2>

            {!currentRegister ? (
              <form onSubmit={handleOpenRegister} className="space-y-4">
                <div>
                  <div className="mb-4 text-gray-700">
                    <strong>Seleccionar Cajero:</strong>
                    <select
                      value={selectedCashier ? JSON.stringify(selectedCashier) : ""}
                      onChange={(e) => setSelectedCashier(JSON.parse(e.target.value))}
                      className="ml-2 p-2 border rounded-md"
                    >
                      <option value="">Seleccionar cajero</option>
                      {cashiers.map((cashier) => (
                        <option key={cashier.id} value={JSON.stringify(cashier)}>
                          {cashier.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Saldo Base</label>
                  <input
                    type="number"
                    value={initialBalance}
                    onChange={(e) => setInitialBalance(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Iniciar Arqueo
                </button>
              </form>
            ) : (
              <form onSubmit={handleCloseRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Total Ingresos</p>
                    <p className="font-medium text-green-600">${currentRegister.totalIngreso.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Egresos</p>
                    <p className="font-medium text-red-600">${currentRegister.totalEgreso.toLocaleString()}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Saldo Inicial</p>
                    <p className="font-medium">
                      ${currentRegister.saldoBase.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Saldo Previsto</p>
                    <p className="font-medium">
                      ${currentRegister.saldoPrevisto.toLocaleString()}
                    </p>
                  </div>

                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Saldo Final</label>
                  <input
                    type="number"
                    value={finalBalance}
                    onChange={(e) => setFinalBalance(e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Observaciones</label>
                  <textarea
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                    rows="3"
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Observaciones"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Cerrar Arqueo
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default ArqueoDeCaja;
