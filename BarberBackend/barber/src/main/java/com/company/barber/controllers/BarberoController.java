package com.company.barber.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.company.barber.entity.Barbero;
import com.company.barber.service.BarberoService;
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
@RequestMapping("/barberos")
public class BarberoController {

    @Autowired
    private BarberoService barberoservice;

    @GetMapping
    public List<Barbero> GetBarberos() {
        return barberoservice.GetAll();
    }

    @PostMapping
    public Barbero CreateBarbero(@RequestBody Barbero barbero) {
        return barberoservice.Create(barbero);
    }

    @PutMapping("/{id}")
    public Barbero UpdateBarbero(@PathVariable("id") Long id, @RequestBody Barbero barbero) {
        return barberoservice.Update(id, barbero);
    }

    @DeleteMapping("/{id}")
    public String deleteCarro(@PathVariable("id") Long id) {
        return barberoservice.Delete(id);
    }
}
