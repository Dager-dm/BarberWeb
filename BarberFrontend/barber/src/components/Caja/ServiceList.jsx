import React from 'react';
import { Scissors } from 'lucide-react';

function ServiceList({ services, loading, onServiceSelect }) {
  console.log('Servicios en ServiceList:', services);

  if (loading) {
    return <div>Cargando servicios...</div>;
  }

  if (services.length === 0) {
    return <div>No hay servicios disponibles.</div>;
  }

  return (
    <div className="p-4 pt-6 bg-white rounded-md shadow-xl h-[calc(100vh-15rem)] flex flex-col sticky top-[-1px]">
      <div className="sticky top-[-1px] z-10 bg-white pb-2">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <Scissors className="w-6 h-6" />
          Servicios Disponibles
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto pr-1">
        <div className="grid grid-cols-2 gap-3 auto-rows-max">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => onServiceSelect(service)}
              className="p-3 border border-gray-200 rounded-md hover:bg-blue-50 transition-colors duration-200 flex flex-col items-start gap-2"
            >
              <span className="font-semibold text-lg text-gray-800">{service.nombre}</span>
              <span className="text-green-600 font-semibold text-lg">${service.precio.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceList;


