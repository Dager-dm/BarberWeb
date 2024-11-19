package com.company.barber.service;

import java.util.List;
import com.company.barber.entity.EstadoCrud;
import com.company.barber.entity.Servicio;
import com.company.barber.repository.ServicioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class ServicioService implements ICrud<Servicio> {

    @Autowired
    private ServicioRepository serviciorepository;

    @Override
    public Servicio Create(Servicio entity) {
        return serviciorepository.save(entity);
    }

    @Override
    public List<Servicio> GetAll() {
        return (List<Servicio>) serviciorepository.findByEstado(EstadoCrud.Habilitado);
    }

    @Override
    public Servicio Update(Long id, Servicio updatedEntity) {
        Servicio servicio = serviciorepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Este servicio no está registrado " + id));
        servicio.setDuracion(updatedEntity.getDuracion());
        servicio.setNombre(updatedEntity.getNombre());
        servicio.setPrecio(updatedEntity.getPrecio());
        return serviciorepository.save(servicio);
    }

    @Override
    public String Delete(Long id) {
        try {
            Servicio servicio = serviciorepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Este servicio no está registrado " + id));
            servicio.setEstado(EstadoCrud.Deshabilitado);
            serviciorepository.save(servicio);
            return "Servicio Eliminado";
        } catch (Exception e) {
            return "Ocurrió un error al eliminar: " + e.getMessage();
        }
    }

    @Override
    public Servicio GetById(Long id) throws Exception {
        return serviciorepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Este servicio no está registrado " + id));
    }

}
