package com.company.barber.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import com.company.barber.entity.ArqueoCaja;
import com.company.barber.entity.EstadoCrud;
import com.company.barber.repository.ArqueoCajaRepository;

public class ArqueoCajaService {
    @Autowired
    private ArqueoCajaRepository ArqueoCajarepository;

    public ArqueoCaja Create(ArqueoCaja entity) {
        return ArqueoCajarepository.save(entity);
    }

    public List<ArqueoCaja> GetAll() {
        return (List<ArqueoCaja>) ArqueoCajarepository.findAll();
    }

    public ArqueoCaja SetMovimientos(Long id, ArqueoCaja updatedEntity) {
        ArqueoCaja arqueoCaja = ArqueoCajarepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Este Arqueo no está registrado " + id));

        if (updatedEntity.getCortes().size() != 0) {
            arqueoCaja.setCortes(updatedEntity.getCortes());
        }
        if (updatedEntity.getEgresos().size() != 0) {
            arqueoCaja.setEgresos(updatedEntity.getEgresos());
        }
        if (updatedEntity.getIngresos().size() != 0) {
            arqueoCaja.setIngresos(updatedEntity.getIngresos());
        }

        return ArqueoCajarepository.save(arqueoCaja);
    }

    public String CloseArqueo(Long id) {
        try {
            ArqueoCaja arqueoCaja = ArqueoCajarepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Este Arqueo no está registrado " + id));
            arqueoCaja.setEstado(EstadoCrud.Deshabilitado);
            ArqueoCajarepository.save(arqueoCaja);
            return "Arqueo cerrado correctamente";
        } catch (Exception e) {
            return "Error al cerrar arqueo  :"+e.getMessage();
        }

    }

    public ArqueoCaja GetById(Long id) throws Exception {
        return ArqueoCajarepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Este servicio no está registrado " + id));
    }
}
