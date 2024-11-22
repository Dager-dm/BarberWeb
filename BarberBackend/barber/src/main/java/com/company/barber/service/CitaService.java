package com.company.barber.service;

import java.util.List;
import com.company.barber.repository.CitaRepository;
import com.company.barber.entity.Cita;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CitaService implements ICrud<Cita> {

    @Autowired
    private CitaRepository citarepository;

    @Override
    public Cita Create(Cita cita) {
        return citarepository.save(cita);
    }

    @Override
    public List<Cita> GetAll() {
        return (List<Cita>) citarepository.findAll();
    }

    @Override
    public String Delete(Long id) {
       try {
        Cita cita = citarepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Esta cita no está registrada" + id));
        citarepository.delete(cita);
        return "cita eliminada";
       } catch (Exception e) {
        return "Ocurrió un errror  :"+e.getMessage();
       }
    }

    @Override
    public Cita GetById(Long id) throws Exception {
        return citarepository.findById(id).orElseThrow(() -> new Exception("Cita no encontrada"));
    }

    @Override
    public Cita Update(Long id, Cita updatedCita) {
        Cita cita= citarepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Esta cita no está registrada " + id));
        cita.setBarbero(updatedCita.getBarbero());
        cita.setDetallesci(updatedCita.getDetallesci());
        cita.setDuracionEstimada(updatedCita.getDuracionEstimada());
        cita.setEstado(updatedCita.getEstado());
        cita.setFechaCita(updatedCita.getFechaCita());
        return citarepository.save(cita);
    }

}
