package com.company.barber.entity;

import lombok.Getter;
import lombok.Setter;
import java.util.List;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@Entity
@Getter
@Setter
public class Cajero extends Empleado {
    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
    @OneToMany(mappedBy = "id")
    private List<ArqueoCaja> Arqueos;
}
