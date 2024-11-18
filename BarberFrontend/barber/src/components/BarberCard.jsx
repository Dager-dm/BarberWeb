import React from 'react';
import { Star } from 'lucide-react';

export default function BarberCard({ barber, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        selected
          ? 'bg-blue-600 text-white shadow-lg scale-105'
          : 'bg-white hover:bg-blue-50'
      }`}
    >
      <div className="relative mb-4">
        <img
          src={barber.image}
          alt={barber.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        {selected && (
          <div className="absolute inset-0 bg-blue-600 opacity-20 rounded-lg"></div>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-2">{barber.name}</h3>
      <div className="flex flex-wrap gap-2">
        {barber.specialties.map((specialty, index) => (
          <span
            key={index}
            className={`text-xs px-2 py-1 rounded-full ${
              selected
                ? 'bg-blue-500 text-white'
                : 'bg-blue-100 text-blue-600'
            }`}
          >
            {specialty}
          </span>
        ))}
      </div>
    </div>
  );
}