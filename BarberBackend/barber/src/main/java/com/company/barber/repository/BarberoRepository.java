package com.company.barber.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import com.company.barber.entity.Barbero;
import com.company.barber.entity.EstadoCrud;

public interface BarberoRepository extends CrudRepository<Barbero, Long> {

    public List<Barbero> findByEstado(EstadoCrud estado);  
}
