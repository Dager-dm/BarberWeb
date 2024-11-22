package com.company.barber.service;

import java.util.List;
import com.company.barber.entity.Empleado;
import com.company.barber.entity.EstadoCrud;
import com.company.barber.repository.EmpleadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class EmpleadoService implements ICrud<Empleado> {

    @Autowired
    private EmpleadoRepository empleadorepository;

    @Override
    public Empleado Create(Empleado entity) {
        return empleadorepository.save(entity);
    }

    @Override
    public List<Empleado> GetAll() {
        return (List<Empleado>) empleadorepository.findByEstado(EstadoCrud.Habilitado);
    }

    @Override
    public Empleado Update(Long id, Empleado updatedEntity) {
        Empleado empleado = empleadorepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Este empleado no está registrado " + id));
        empleado.setCedula(updatedEntity.getCedula());
        empleado.setCargo(updatedEntity.getCargo());
        empleado.setNombre(updatedEntity.getNombre());
        empleado.setTelefono(updatedEntity.getTelefono());
        return empleadorepository.save(empleado);
    }

    @Override
    public String Delete(Long id) {
        try {
            Empleado empleado = empleadorepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Este empleado no está registrado " + id));
            empleado.setEstado(EstadoCrud.Deshabilitado);
            empleadorepository.save(empleado);
            return "empleado Eliminado";
        } catch (Exception e) {
            return "Ocurrió un error al eliminar: " + e.getMessage();
        }
    }

    @Override
    public Empleado GetById(Long id) throws Exception {
       return empleadorepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Este Empleado no está registrado " + id));
    }

}
