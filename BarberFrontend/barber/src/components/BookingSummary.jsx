import React from 'react';
import { ShoppingCart, Clock, Scissors, User, Calendar } from 'lucide-react';

export default function BookingSummary({
  selectedServices,
  selectedBarber,
  selectedDate,
  totalPrice,
  totalDuration
}) {
  return (
    <div className="w-80 bg-white rounded-lg p-6 h-fit sticky top-8">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-bold">Resumen de Reserva</h2>
      </div>

      {selectedServices.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Scissors className="w-4 h-4 text-blue-600" />
            Servicios Seleccionados
          </h3>
          <ul className="space-y-2">
            {selectedServices.map(service => (
              <li key={service.id} className="flex justify-between text-sm">
                <span>{service.name}</span>
                <span className="font-semibold">${service.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedBarber && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Barbero
          </h3>
          <p className="text-sm">{selectedBarber.name}</p>
        </div>
      )}

      {selectedServices.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Duración Total
          </h3>
          <p className="text-sm">{totalDuration} minutos</p>
        </div>
      )}

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${totalPrice}</span>
        </div>
      </div>
    </div>
  );
}