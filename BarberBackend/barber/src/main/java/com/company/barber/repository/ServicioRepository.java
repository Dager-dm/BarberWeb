package com.company.barber.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import com.company.barber.entity.EstadoCrud;
import com.company.barber.entity.Servicio;

public interface ServicioRepository extends CrudRepository<Servicio, Long>{

    public List<Servicio> findByEstado(EstadoCrud estado); 
}
