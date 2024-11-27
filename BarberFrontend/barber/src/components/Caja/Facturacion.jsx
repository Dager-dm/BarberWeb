import React, { useState, useEffect } from 'react';
import ServiceList from '../Caja/ServiceList';
import BillingPanel from '../Caja/BillingPanel';
import ClientService from '../../services/ClientService';
import ServiceService from '../../services/ServiceService';
import ArqueoService from '../../services/ArqueoService';

const Facturacion = () => {
  const [services, setServices] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loadingServices, setLoadingServices] = useState(true); // Estado de carga de servicios
  const [loadingClients, setLoadingClients] = useState(true); // Estado de carga de clientes
  const SeService = new ServiceService();
  const CService = new ClientService();
  const ArqService = new ArqueoService();

  // Método para obtener servicios
  const obtenerServicios = async () => {
    try {
      const response = await SeService.getServices();
      console.log('Respuesta de la API de servicios:', response);
      setServices(response);
      console.log('Servicios establecidos en el estado:', response);
    } catch (error) {
      console.error('Error al obtener servicios:', error);
    } finally {
      setLoadingServices(false);
    }
  };

  // Método para obtener clientes
  const obtenerClientes = async () => {
    try {
      const response = await CService.getClientes();
      console.log('Respuesta de la API de clientes:', response);
      setClients(response);
      console.log('Clientes establecidos en el estado:', response);
    } catch (error) {
      console.error('Error al obtener clientes:', error);
    } finally {
      setLoadingClients(false);
    }
  };

  // Método para registrar un corte
  const registrarCorte = async (data) => {
    try {
      await ArqService.SetCorte(data);
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
    setSelectedClient(JSON.parse(e.target.value));
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
      client: selectedClient,
      services: selectedServices,
      paymentMethod,
      total: selectedServices.reduce((sum, service) => sum + service.precio, 0),
      date: new Date(),
    };
    
    console.log(dataToSend); 

    console.log(await registrarCorte(dataToSend));

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
            loading={loadingServices} // Pasamos el estado de carga
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
