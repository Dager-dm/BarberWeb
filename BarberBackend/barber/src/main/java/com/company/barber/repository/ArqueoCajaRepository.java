package com.company.barber.repository;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import com.company.barber.entity.ArqueoCaja;
import com.company.barber.entity.EstadoCrud;

public interface ArqueoCajaRepository extends CrudRepository<ArqueoCaja, Long> {
   public List<ArqueoCaja> findByEstado(EstadoCrud estado); 

   public ArqueoCaja findFirstByEstado(EstadoCrud estado);

}
