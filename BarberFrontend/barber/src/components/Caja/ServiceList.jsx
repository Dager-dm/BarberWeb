import React from 'react';
import { Scissors } from 'lucide-react';

function ServiceList({ services, onServiceSelect }) {
  return (
    <div className="p-4 bg-white rounded-md shadow-md h-[calc(100vh-15rem)] flex flex-col">
      <div className="sticky top-0 bg-white pb-2">
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
              <span className="font-semibold text-lg text-gray-800">{service.name}</span>
              <span className="text-green-600 font-semibold text-lg">${service.price.toFixed(2)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServiceList;

