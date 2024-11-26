import React, { useState, useEffect } from 'react';
import ServiceList from '../Caja/ServiceList';
import BillingPanel from '../Caja/BillingPanel';
import ClientService from '../../services/ClientService';
import Service from '../../services/ServiceService';
import ArqueoService from '../../services/ArqueoService';

const Facturacion = () => {
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Método para obtener servicios
  const obtenerServicios = async () => {
    try {
      const response = await Service.obtenerServicios();
      setServices(response.data);

      console.log('Servicios obtenidos correctamente');
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    }
  };

  // Método para obtener clientes
  const obtenerClientes = async () => {
    try {
      const response = await ClientService.obtenerClientes();
      setClients(response.data);

      console.log('Clientes obtenidos correctamente');
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    }
  };

  // Método para registrar un corte
  const registrarCorte = async (data) => {
    try {
      await ArqueoService.registrarCorte(data);

      console.log('Corte registrado correctamente:', data);
    } catch (error) {
      console.error('Error al registrar corte:', error);
    }
  };

  // Cargar servicios y clientes al montar el componente
  useEffect(() => {
    obtenerServicios();
    obtenerClientes();
  }, []);

  const handleServiceSelect = (service) => {
    const isServiceSelected = selectedServices.some(
      (selected) => selected.id === service.id
    );

    if (isServiceSelected) {
      alert('Este servicio ya ha sido agregado');
      return;
    }

    setSelectedServices([...selectedServices, { ...service, instanceId: Date.now() }]);
  };

  const handleRemoveService = (instanceId) => {
    setSelectedServices(
      selectedServices.filter((service) => service.instanceId !== instanceId)
    );
  };

  const handleClientChange = (e) => {
    setSelectedClient(e.target.value);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCheckout = async () => {
    if (!selectedClient) {
      alert('Por favor seleccione un cliente');
      return;
    }
    if (!paymentMethod) {
      alert('Por favor seleccione un método de pago');
      return;
    }

    const dataToSend = {
      clientId: selectedClient,
      services: selectedServices,
      paymentMethod,
      total: selectedServices.reduce((sum, service) => sum + service.price, 0),
      date: new Date(),
    };

    await registrarCorte(dataToSend);

    setSelectedServices([]);
    setSelectedClient('');
    setPaymentMethod('');
  };

  return (
    <div className="min-h-[70vh] bg-gray-100 p-3">
      <div className="flex gap-3 h-[calc(100vh-5rem)] max-h-[68vh]">
        <div className="w-[70%] h-full">
          <ServiceList 
            services={services}
            onServiceSelect={handleServiceSelect}
          />
        </div>
        <div className="w-[30%] h-full">
          <BillingPanel
            clients={clients}
            selectedServices={selectedServices}
            onClientChange={handleClientChange}
            onRemoveService={handleRemoveService}
            onCheckout={handleCheckout}
            onPaymentMethodChange={handlePaymentMethodChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Facturacion;
