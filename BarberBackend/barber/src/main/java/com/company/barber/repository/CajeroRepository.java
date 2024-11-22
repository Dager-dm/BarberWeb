package com.company.barber.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import com.company.barber.entity.Cajero;
import com.company.barber.entity.EstadoCrud;

public interface CajeroRepository extends CrudRepository<Cajero, Long>{

    public List<Cajero> findByEstado(EstadoCrud estado); 
}
