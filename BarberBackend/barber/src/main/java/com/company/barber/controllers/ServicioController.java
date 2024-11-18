package com.company.barber.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.company.barber.entity.Servicio;
import com.company.barber.service.ServicioService;
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
@RequestMapping("/servicios")
public class ServicioController {

    @Autowired
    private ServicioService servicioservice;

    @GetMapping
    public List<Servicio> GetServicios() {
        return servicioservice.GetAll();
    }

    @PostMapping
    public Servicio CreateServicio(@RequestBody Servicio servicio) {
        return servicioservice.Create(servicio);
    }

    @PutMapping("/{id}")
    public Servicio UpdateServicio(@PathVariable("id") Long id, @RequestBody Servicio servicio) {
        return servicioservice.Update(id, servicio);
    }

    @DeleteMapping("/{id}")
    public String DeleteService(@PathVariable("id") Long id) {
        return servicioservice.Delete(id);
    }

}
