package com.company.barber.entity;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
@Getter
@Setter
public class Barbero extends Empleado{
    @OneToMany(mappedBy = "id")
    private List<Cita> citas;
}
