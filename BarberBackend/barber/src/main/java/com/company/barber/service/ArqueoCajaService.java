package com.company.barber.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import com.company.barber.entity.ArqueoCaja;
import com.company.barber.entity.Corte;
import com.company.barber.entity.Egreso;
import com.company.barber.entity.EstadoCrud;
import com.company.barber.entity.Ingreso;
import com.company.barber.repository.ArqueoCajaRepository;

@Service
public class ArqueoCajaService {
    @Autowired
    private ArqueoCajaRepository Arqueorepository;

    public ArqueoCaja Create(ArqueoCaja entity) {
        return Arqueorepository.save(entity);
    }

    public List<ArqueoCaja> GetHistorial() {
        return (List<ArqueoCaja>) Arqueorepository.findAll();
    }

    public ArqueoCaja GetOpenArqueo() {
        return (ArqueoCaja) Arqueorepository.findFirstByEstado(EstadoCrud.Habilitado);
    }

    public String CloseArqueo(ArqueoCaja arqueo, Long id) {
        try {
            ArqueoCaja arqueoCaja = Arqueorepository.findById(id)
                    .orElseThrow(() -> new ResourceNotFoundException("Este Arqueo no está registrado " + arqueo.getId()));
            arqueoCaja.setEstado(EstadoCrud.Deshabilitado);
            arqueoCaja.setFechaCierre(arqueo.getFechaCierre());
            arqueoCaja.setObservacion(arqueo.getObservacion());
            arqueoCaja.setSaldoReal(arqueo.getSaldoReal());
            arqueoCaja.CalcularDiferencia();
            Arqueorepository.save(arqueoCaja);
            return "Arqueo cerrado correctamente";
        } catch (Exception e) {
            return "Error al cerrar arqueo  :" + e.getMessage();
        }

    }

    public ArqueoCaja GetById(Long id) throws Exception {
        return Arqueorepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Este servicio no está registrado " + id));
    }

    public ArqueoCaja SetMovimientos(Long id, ArqueoCaja updatedEntity) {
        ArqueoCaja arqueoCaja = Arqueorepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Este Arqueo no está registrado " + id));
    
        if (updatedEntity.getCortes() != null) {
            SetearCortes(arqueoCaja, updatedEntity.getCortes());
            arqueoCaja.CalcularIngresos();
        }
        if (updatedEntity.getEgresos() != null) {
            SetearEgresos(arqueoCaja, updatedEntity.getEgresos());
            arqueoCaja.CalcularEgresos();
        }
        if (updatedEntity.getIngresos() != null) {
            SetearIngresos(arqueoCaja, updatedEntity.getIngresos());
            arqueoCaja.CalcularIngresos();
        }
    
        arqueoCaja.CalcularSaldoPrevisto();
        return Arqueorepository.save(arqueoCaja);
    }
    

    private void SetearCortes(ArqueoCaja arqueo, List<Corte> lst) {
        arqueo.getCortes().clear(); // Limpia la lista actual
        for (Corte c : lst) {
            c.setArqueocaja(arqueo); // Establece la relación del lado hijo
            arqueo.getCortes().add(c); // Agrega a la lista del padre
        }
    }
    
    private void SetearIngresos(ArqueoCaja arqueo, List<Ingreso> lst) {
        arqueo.getIngresos().clear();
        for (Ingreso i : lst) {
            i.setArqueocaja(arqueo);
            arqueo.getIngresos().add(i);
        }
    }
    
    private void SetearEgresos(ArqueoCaja arqueo, List<Egreso> lst) {
        arqueo.getEgresos().clear();
        for (Egreso e : lst) {
            e.setArqueocaja(arqueo);
            arqueo.getEgresos().add(e);
        }
    }

}
