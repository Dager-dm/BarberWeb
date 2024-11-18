package com.company.barber.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.company.barber.entity.Cita;
import com.company.barber.service.CitaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/citas")
public class CitaController {
    @Autowired
    private CitaService citaservice;

    @GetMapping
    public List<Cita> GetCitas() {
        return citaservice.GetAll();
    }

    @PostMapping
    public Cita CreateCita(@RequestBody Cita Cita) {
        return citaservice.Create(Cita);
    }

    @PutMapping("/{id}")
    public Cita UpdateCita(@PathVariable("id") Long id, @RequestBody Cita Cita) {
        return citaservice.Update(id, Cita);
    }

    @DeleteMapping("/{id}")
    public String deleteCarro(@PathVariable("id") Long id) {
        return citaservice.Delete(id);
    }
}
