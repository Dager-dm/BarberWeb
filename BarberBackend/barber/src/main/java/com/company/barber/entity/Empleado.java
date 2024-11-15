package com.company.barber.entity;

import jakarta.persistence.Entity;

//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

public class Empleado extends Persona {
 private CargoEmpleado cargo;

}
