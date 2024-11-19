import React, { useState } from 'react';
import { Scissors, Calendar, User } from 'lucide-react';
import { services, barbers } from '../components/data';
import ServiceCard from './ServiceCard';
import BarberCard from '../components/BarberCard';
import DatePicker from '../components/DatePicker';
import BookingSummary from '../components/BookingSummary';
import { createTheme, ThemeProvider, useMediaQuery, CssBaseline, Button, Typography, Paper } from '@mui/material';

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

  // Crear tema de Material UI con soporte para modo oscuro y claro
  const theme = createTheme({
    palette: {
      mode: 'dark', // Usa el modo oscuro por defecto
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: '#121212', // Fondo oscuro por defecto
        paper: '#1d1d1d', // Color de fondo de los cuadros
      },
      text: {
        primary: '#ffffff', // Texto blanco para el modo oscuro
      },
    },
    typography: {
      fontFamily: 'Roboto, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Asegura que los estilos de Material UI se apliquen globalmente */}
      <div className="min-h-screen"> {/* Sin fondo específico, el tema manejará el fondo */}
        <main className="max-w-7xl mx-auto px-4 py-8 h-auto"> {/* Ajuste dinámico de altura */}
          <div className="flex gap-8 overflow-y-auto"> {/* Scroll activado solo cuando el contenido excede la altura */}
            {/* Left Section - Booking Steps */}
            <div className="flex-1">
              {/* Services Section */}
              {currentStep === 'services' && (
                <section>
                  <div className="flex items-center gap-2 mb-6">
                    <Scissors className="w-6 h-6 text-blue-600" />
                    <Typography variant="h5" color="textPrimary">
                      Selecciona tus servicios
                    </Typography>
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
                    <Typography variant="h5" color="textPrimary">
                      Elige tu barbero
                    </Typography>
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
                  <div className="flex items-center gap-8 mb-6">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    <Typography variant="h5" color="textPrimary">
                      Selecciona fecha y hora
                    </Typography>
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
                  <Button
                    onClick={handlePrevStep}
                    variant="contained"
                    color="secondary"
                  >
                    Anterior
                  </Button>
                )}
                {currentStep !== 'date' ? (
                  <Button
                    onClick={handleNextStep}
                    disabled={
                      (currentStep === 'services' && selectedServices.length === 0) ||
                      (currentStep === 'barber' && !selectedBarber)
                    }
                    variant="contained"
                    color="primary"
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    onClick={handleBookAppointment}
                    variant="contained"
                    color="primary"
                  >
                    Confirmar Reserva
                  </Button>
                )}
              </div>
            </div>

            {/* Right Section - Booking Summary */}
            <Paper elevation={3} sx={{ p: 2 }}>
              <BookingSummary
                selectedServices={selectedServices}
                selectedBarber={selectedBarber}
                selectedDate={selectedDate}
                totalPrice={totalPrice}
                totalDuration={totalDuration}
              />
            </Paper>
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default CitasCliente;