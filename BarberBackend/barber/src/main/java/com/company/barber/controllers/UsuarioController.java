package com.company.barber.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.company.barber.entity.Usuario;
import com.company.barber.service.UsuarioService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired private UsuarioService usuarioService; 
    @PostMapping("/validar") 
    public ResponseEntity<Usuario> validarUsuario(@RequestBody LoginDto loginRequest) { 
        Optional<Usuario> usuarioOpt = usuarioService.validarUsuario(loginRequest.getEmail(), loginRequest.getContraseña()); 
        if (usuarioOpt.isPresent()) { 
            return new ResponseEntity<>(usuarioOpt.get(), HttpStatus.OK); 
        } else { 
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
         } 
        }
}