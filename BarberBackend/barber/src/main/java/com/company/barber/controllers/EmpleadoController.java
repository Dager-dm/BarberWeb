package com.company.barber.controllers;


import com.company.barber.entity.Empleado;
import com.company.barber.service.EmpleadoService;
import java.util.List;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/empleados")
public class EmpleadoController {
    @Autowired
    private EmpleadoService empleadoservice;

    @GetMapping
    public List<Empleado> GetEmpleados() {
        return empleadoservice.GetAll();
    }

    @PostMapping
    public Empleado CreateEmpleado(@RequestBody Empleado empleado) {
        return empleadoservice.Create(empleado);
    }

    @PutMapping("/{id}")
    public Empleado UpdateEmpleado(@PathVariable("id") Long id, @RequestBody Empleado empleado) {
        return empleadoservice.Update(id, empleado);
    }

}
