package com.company.barber.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import com.company.barber.entity.Empleado;
import com.company.barber.entity.EstadoCrud;

public interface EmpleadoRepository extends CrudRepository<Empleado, Long>{

   public List<Empleado> findByEstado(EstadoCrud estado); 
}
