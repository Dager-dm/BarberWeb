import React, { useState } from 'react';
import { Scissors, Calendar, User, ShoppingCart } from 'lucide-react';
import { services, barbers } from '../components/data';
import ServiceCard from './ServiceCard';
import BarberCard from '../components/BarberCard';
import DatePicker from '../components/DatePicker';
import BookingSummary from '../components/BookingSummary';

function CitasCliente() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentStep, setCurrentStep] = useState('services');

  const totalPrice = selectedServices.reduce((sum, service) => sum + service.price, 0);
  const totalDuration = selectedServices.reduce((sum, service) => sum + service.duration, 0);

  const handleServiceToggle = (service) => {
    setSelectedServices(prev =>
      prev.find(s => s.id === service.id)
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const handleNextStep = () => {
    if (currentStep === 'services' && selectedServices.length > 0) {
      setCurrentStep('barber');
    } else if (currentStep === 'barber' && selectedBarber) {
      setCurrentStep('date');
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'date') {
      setCurrentStep('barber');
    } else if (currentStep === 'barber') {
      setCurrentStep('services');
    }
  };

  const handleBookAppointment = () => {
    if (!selectedBarber || selectedServices.length === 0) return;

    const appointment = {
      services: selectedServices,
      barber: selectedBarber,
      date: selectedDate,
      totalPrice,
      totalDuration
    };

    alert('¡Cita reservada con éxito!');
    console.log(appointment);
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Left Section - Booking Steps */}
          <div className="flex-1">
            {/* Services Section */}
            {currentStep === 'services' && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <Scissors className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Selecciona tus servicios</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      selected={selectedServices.some(s => s.id === service.id)}
                      onClick={() => handleServiceToggle(service)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Barbers Section */}
            {currentStep === 'barber' && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <User className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Elige tu barbero</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {barbers.map((barber) => (
                    <BarberCard
                      key={barber.id}
                      barber={barber}
                      selected={selectedBarber?.id === barber.id}
                      onClick={() => setSelectedBarber(barber)}
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Date Selection Section */}
            {currentStep === 'date' && (
              <section>
                <div className="flex items-center gap-8 mb-6"> {/* Aumenta el espacio entre el ícono y el texto */}
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Selecciona fecha y hora</h2>
                </div>
                <DatePicker
                  selectedDate={selectedDate}
                  onDateChange={setSelectedDate}
                  duration={totalDuration}
                  className="mt-10"
                />
              </section>
            )}


            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep !== 'services' && (
                <button
                  onClick={handlePrevStep}
                  className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Anterior
                </button>
              )}
              {currentStep !== 'date' ? (
                <button
                  onClick={handleNextStep}
                  disabled={
                    (currentStep === 'services' && selectedServices.length === 0) ||
                    (currentStep === 'barber' && !selectedBarber)
                  }
                  className={`px-6 py-2 rounded-lg ml-auto ${((currentStep === 'services' && selectedServices.length > 0) ||
                      (currentStep === 'barber' && selectedBarber))
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-400 cursor-not-allowed text-white'
                    }`}
                >
                  Siguiente
                </button>
              ) : (
                <button
                  onClick={handleBookAppointment}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
                >
                  Confirmar Reserva
                </button>
              )}
            </div>
          </div>

          {/* Right Section - Booking Summary */}
          <BookingSummary
            selectedServices={selectedServices}
            selectedBarber={selectedBarber}
            selectedDate={selectedDate}
            totalPrice={totalPrice}
            totalDuration={totalDuration}
          />
        </div>
      </main>
     </div>
  );
}

export default CitasCliente;