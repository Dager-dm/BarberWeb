package com.company.barber.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.company.barber.entity.Cliente;
import com.company.barber.entity.EstadoCrud;
import com.company.barber.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;

@Service
public class ClienteService implements ICrud<Cliente> {

    @Autowired
    private ClienteRepository clienterepository;

    @Override
    public Cliente Create(Cliente entity) {
        return clienterepository.save(entity);
    }

    @Override
    public List<Cliente> GetAll() {
        return (List<Cliente>) clienterepository.findAll();
    }

    @Override
    public Cliente Update(Long id, Cliente updatedEntity) {
        Cliente cliente = clienterepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Este cliente no está registrado " + id));
        cliente.setCedula(updatedEntity.getCedula());
        cliente.setCitas(updatedEntity.getCitas());
        cliente.setCortes(updatedEntity.getCortes());
        cliente.setNombre(updatedEntity.getNombre());
        cliente.setTelefono(updatedEntity.getTelefono());
        return clienterepository.save(cliente);
    }

    @Override
    public String Delete(Long id) {
        try {
            Cliente cliente = clienterepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Este cliente no está registrado " + id));
            cliente.setEstado(EstadoCrud.Deshabilitado);
            clienterepository.save(cliente);
            return "Cliente Eliminado";
        } catch (Exception e) {
            return "Ocurrió un error al eliminar: " + e.getMessage();
        }
    }

    @Override
    public Cliente GetById(Long id) throws Exception {
        return clienterepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Este servicio no está registrado " + id));
    }

}
