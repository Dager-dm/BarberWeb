package com.company.barber.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.company.barber.entity.Cajero;
import com.company.barber.service.CajeroService;
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
@RequestMapping("/cajeros")
public class CajeroController {
    @Autowired
    private CajeroService Cajeroservice;

    @GetMapping
    public List<Cajero> GetCajeros() {
        return Cajeroservice.GetAll();
    }

    @PostMapping
    public Cajero CreateCajero(@RequestBody Cajero cajero) {
        return Cajeroservice.Create(cajero);
    }

    @PutMapping("/{id}")
    public Cajero UpdateCajero(@PathVariable("id") Long id, @RequestBody Cajero cajero) {
        return Cajeroservice.Update(id, cajero);
    }

    @DeleteMapping("/{id}")
    public String deleteCarro(@PathVariable("id") Long id) {
        return Cajeroservice.Delete(id);
    }
}
