package com.company.barber.repository;

import com.company.barber.entity.Cliente;
import com.company.barber.entity.EstadoCrud;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface ClienteRepository extends CrudRepository<Cliente, Long>{

    public List<Cliente> findByEstado(EstadoCrud estado); 
}
