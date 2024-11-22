package com.company.barber.service;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import com.company.barber.entity.Cajero;
import com.company.barber.entity.EstadoCrud;
import com.company.barber.repository.CajeroRepository;


@Service
public class CajeroService implements ICrud<Cajero> {

    @Autowired
    private CajeroRepository cajerorepository;

    @Override
    public Cajero Create(Cajero entity) {
        return cajerorepository.save(entity);
    }

    @Override
    public List<Cajero> GetAll() {
        return (List<Cajero>) cajerorepository.findByEstado(EstadoCrud.Habilitado);
    }

    @Override
    public Cajero Update(Long id, Cajero updatedEntity) {
        Cajero cajero = cajerorepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Este Cajero no está registrado " + id));
        cajero.setCedula(updatedEntity.getCedula());
        cajero.setCargo(updatedEntity.getCargo());
        cajero.setNombre(updatedEntity.getNombre());
        cajero.setTelefono(updatedEntity.getTelefono());
        return cajerorepository.save(cajero);
    }

    @Override
    public String Delete(Long id) {
        try {
            Cajero cajero= cajerorepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Este Cajero no está registrado " + id));
            cajero.setEstado(EstadoCrud.Deshabilitado);
            cajerorepository.save(cajero);
            return "Cajero Eliminado";
        } catch (Exception e) {
            return "Ocurrió un error al eliminar: " + e.getMessage();
        }
    }

    @Override
    public Cajero GetById(Long id) throws Exception {
       return cajerorepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Este Cajero no está registrado " + id));
    }



}