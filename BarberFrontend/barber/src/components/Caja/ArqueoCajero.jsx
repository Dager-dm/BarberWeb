import React, { useState, useEffect } from 'react';
import { DollarSign, Clock } from 'lucide-react';
import ArqueoService from '../../services/ArqueoService';

// Simulación de usuario autenticado (en producción, obtén esto de tu sistema de autenticación)
const loggedInUser = { id: 2, name: 'María García' };

function ArqueoDeCaja() {
  const [registers, setRegisters] = useState([]);
  const [selectedCashier, setSelectedCashier] = useState('');
  const [initialBalance, setInitialBalance] = useState('');
  const [finalBalance, setFinalBalance] = useState('');
  const [observation, setObservation] = useState('');
  const [currentRegister, setCurrentRegister] = useState(null);

  // Mock data for demonstration
  const totalIncome = 500000;
  const totalExpenses = 150000;

  useEffect(() => {
    // Configura el cajero seleccionado automáticamente
    setSelectedCashier(loggedInUser.name);
  }, []);

  const handleOpenRegister = async (e) => {
    e.preventDefault();
    if (!selectedCashier || !initialBalance) return;

    const newRegister = {
      id: Date.now(),
      cashier: selectedCashier,
      initialBalance: parseFloat(initialBalance),
      status: 'open',
      date: new Date().toLocaleString(),
    };

    setRegisters([newRegister, ...registers]);
    setCurrentRegister(newRegister);

    await ArqueoService.openArqueo(newRegister); // Método vacío por ahora
  };

  const handleCloseRegister = async (e) => {
    e.preventDefault();
    if (!currentRegister || !finalBalance) return;

    const expectedBalance = currentRegister.initialBalance + totalIncome - totalExpenses;
    const difference = parseFloat(finalBalance) - expectedBalance;

    const updatedRegister = {
      ...currentRegister,
      finalBalance: parseFloat(finalBalance),
      totalIncome,
      totalExpenses,
      expectedBalance,
      difference,
      observation,
      status: 'closed',
    };

    setRegisters(registers.map((reg) => (reg.id === currentRegister.id ? updatedRegister : reg)));
    setCurrentRegister(null);
    setInitialBalance('');
    setFinalBalance('');
    setObservation('');

    await ArqueoService.closeArqueo(updatedRegister); // Método vacío por ahora
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sistema de Arqueo de Caja</h1>

        <div className="flex gap-8">
          {/* Historial de Arqueos */}
          <div className="w-[70%] bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Historial de Arqueos
            </h2>
            <div className="space-y-4">
              {registers.map((register) => (
                <div
                  key={register.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-lg">{register.cashier}</p>
                      <p className="text-sm text-gray-500">{register.date}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        register.status === 'open'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {register.status === 'open' ? 'Abierto' : 'Cerrado'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600">Saldo Inicial</p>
                      <p className="font-medium">${register.initialBalance.toLocaleString()}</p>
                    </div>
                    {register.status === 'closed' && (
                      <>
                        <div>
                          <p className="text-sm text-gray-600">Saldo Final</p>
                          <p className="font-medium">${register.finalBalance?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Diferencia</p>
                          <p
                            className={`font-medium ${
                              register.difference && register.difference < 0
                                ? 'text-red-600'
                                : 'text-green-600'
                            }`}
                          >
                            ${register.difference?.toLocaleString()}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {registers.length === 0 && (
                <p className="text-gray-500 text-center py-8">No hay arqueos registrados</p>
              )}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cajero</label>
                  <p className="font-medium text-gray-800">{selectedCashier}</p>
                </div>
                <div>
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
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Iniciar Arqueo
                </button>
              </form>
            ) : (
              <form onSubmit={handleCloseRegister} className="space-y-4">
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
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Opcional"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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
