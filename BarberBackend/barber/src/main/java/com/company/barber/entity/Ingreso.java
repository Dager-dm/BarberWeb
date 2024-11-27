package com.company.barber.entity;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Ingreso extends Movimiento {
    @ManyToOne
    @JoinColumn(name = "id_arqueo")
   @JsonIgnore
    private ArqueoCaja arqueocaja;
}
