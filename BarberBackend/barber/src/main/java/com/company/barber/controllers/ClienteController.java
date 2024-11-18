package com.company.barber.controllers;

import org.springframework.web.bind.annotation.RestController;
import com.company.barber.entity.Cliente;
import com.company.barber.service.ClienteService;
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
@RequestMapping("/clientes")
public class ClienteController {
    @Autowired
    private ClienteService clienteservice;

    @GetMapping
    public List<Cliente> GetClientes() {
        return clienteservice.GetAll();
    }

    @PostMapping
    public Cliente CreateCliente(@RequestBody Cliente cliente) {
        return clienteservice.Create(cliente);
    }

    @PutMapping("/{id}")
    public Cliente UpdateCliente(@PathVariable("id") Long id, @RequestBody Cliente cliente) {
        return clienteservice.Update(id, cliente);
    }

    @DeleteMapping("/{id}")
    public String DeleteCliente(@PathVariable("id") Long id) {
        return clienteservice.Delete(id);
    }
}
