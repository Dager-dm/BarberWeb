package com.company.barber.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.company.barber.entity.ArqueoCaja;
import com.company.barber.service.ArqueoCajaService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/arqueos")
public class ArqueoCajaController {

    @Autowired
    private ArqueoCajaService arqueoservice;

    @GetMapping
    public List<ArqueoCaja> GetArqueoHistorial() {
        return arqueoservice.GetHistorial();
    }

    @PostMapping
    public ArqueoCaja CreateArqueoCaja(@RequestBody ArqueoCaja ArqueoCaja) {
        return arqueoservice.Create(ArqueoCaja);
    }

    @GetMapping("/abierto")
    public ArqueoCaja GetOpenArqueo() {
        return arqueoservice.GetOpenArqueo();
    }

    @PutMapping("/{id}")
    public ArqueoCaja UpdateArqueoCaja(@PathVariable("id") Long id, @RequestBody ArqueoCaja ArqueoCaja) {
        return arqueoservice.SetMovimientos(id, ArqueoCaja);
    }

    @PutMapping("/close/{id}")
    public String CloseArqueo(@PathVariable("id") Long id, @RequestBody ArqueoCaja Arqueocaja) {
        return arqueoservice.CloseArqueo(Arqueocaja, id);
    }
}
