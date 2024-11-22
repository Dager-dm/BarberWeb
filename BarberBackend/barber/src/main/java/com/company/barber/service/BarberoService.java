package com.company.barber.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import com.company.barber.entity.Barbero;
import com.company.barber.entity.EstadoCrud;
import com.company.barber.repository.BarberoRepository;

@Service
public class BarberoService implements ICrud<Barbero> {

    @Autowired
    private BarberoRepository barberorepository;

    @Override
    public Barbero Create(Barbero entity) {
        return barberorepository.save(entity);
    }

    @Override
    public List<Barbero> GetAll() {
        return (List<Barbero>) barberorepository.findByEstado(EstadoCrud.Habilitado);
    }

    @Override
    public Barbero Update(Long id, Barbero updatedEntity) {
        Barbero barbero = barberorepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Este barbero no está registrado " + id));
        barbero.setCedula(updatedEntity.getCedula());
        barbero.setCargo(updatedEntity.getCargo());
        barbero.setNombre(updatedEntity.getNombre());
        barbero.setTelefono(updatedEntity.getTelefono());
        return barberorepository.save(barbero);
    }

    @Override
    public String Delete(Long id) {
        try {
            Barbero barbero= barberorepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Este barbero no está registrado " + id));
            barbero.setEstado(EstadoCrud.Deshabilitado);
            barberorepository.save(barbero);
            return "Barbero Eliminado";
        } catch (Exception e) {
            return "Ocurrió un error al eliminar: " + e.getMessage();
        }
    }

    @Override
    public Barbero GetById(Long id) throws Exception {
       return barberorepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Este barberorno está registrado " + id));
    }

}