package com.company.barber.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {
    private String email; 
    private String contraseña;
}
