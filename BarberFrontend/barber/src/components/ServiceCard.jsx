import React from 'react';
import { Clock, Scissors } from 'lucide-react';

export default function ServiceCard({ service, selected, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-all ${
        selected
          ? 'bg-blue-600 text-white shadow-lg scale-105'
          : 'bg-white hover:bg-blue-50'
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <Scissors className={`w-6 h-6 ${selected ? 'text-white' : 'text-blue-600'}`} />
        <span className="font-bold">${service.price}</span>
      </div>
      <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
      <div className="flex items-center text-sm">
        <Clock className="w-4 h-4 mr-1" />
        <span>{service.duration} min</span>
      </div>
    </div>
  );
}