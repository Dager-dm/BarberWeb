import React from 'react';
import { Trash2, Receipt } from 'lucide-react';

function BillingPanel({ clients, selectedServices, onClientChange, onRemoveService, onCheckout }) {
  const total = selectedServices.reduce((sum, service) => sum + service.price, 0);

  return (
    <div className="p-3 bg-white rounded-lg shadow-md h-[calc(100vh-15rem)] w-[320px] flex flex-col">
      <h2 className="text-xl font-bold mb-2 text-gray-800 flex items-center gap-2">
        <Receipt className="w-5 h-5" />
        Facturación
      </h2>

      <select
        className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
        onChange={onClientChange}
      >
        <option value="">Seleccionar Cliente</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <div className="flex-grow overflow-y-auto mb-2">
        <h3 className="font-semibold mb-2 text-gray-700 text-base">Servicios Seleccionados</h3>
        {selectedServices.map((service) => (
          <div
            key={service.instanceId}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-lg mb-2"
          >
            <div>
              <p className="font-medium text-sm">{service.name}</p>
              <p className="text-green-600 text-sm">${service.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => onRemoveService(service.instanceId)}
              className="p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors duration-200"
              title="Eliminar servicio"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t pt-2">
        <div className="flex justify-between mb-2">
          <span className="text-base font-bold">Total:</span>
          <span className="text-base font-bold text-green-600">${total.toFixed(2)}</span>
        </div>

        <button
          onClick={onCheckout}
          disabled={selectedServices.length === 0}
          className="w-full bg-indigo-600 text-white py-1.5 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 text-base"
        >
          Registrar Venta
        </button>
      </div>
    </div>
  );
}

export default BillingPanel;
