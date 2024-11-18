import React from 'react';
import { Calendar } from 'lucide-react';

export default function DatePicker({ selectedDate, onDateChange, duration }) {
  // Calculate available time slots based on duration
  const timeSlots = [];
  const startHour = 9; // 9 AM
  const endHour = 17; // 5 PM
  const interval = 30; // 30-minute intervals

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += interval) {
      timeSlots.push({
        hour,
        minute,
        label: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      });
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold">Selecciona Fecha y Hora</h3>
      </div>
      
      <input
        type="date"
        value={selectedDate.toISOString().split('T')[0]}
        onChange={(e) => {
          const newDate = new Date(e.target.value);
          newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes());
          onDateChange(newDate);
        }}
        min={new Date().toISOString().split('T')[0]}
        className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map(({ hour, minute, label }) => {
          const slotDate = new Date(selectedDate);
          slotDate.setHours(hour, minute);
          
          const isSelected = 
            selectedDate.getHours() === hour && 
            selectedDate.getMinutes() === minute;

          return (
            <button
              key={label}
              onClick={() => onDateChange(slotDate)}
              className={`p-2 rounded-lg text-center text-sm ${
                isSelected
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 hover:bg-blue-50'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}