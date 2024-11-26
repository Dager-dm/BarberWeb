package com.company.barber.entity;

//import java.util.Date;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
//import jakarta.persistence.Temporal;
//import jakarta.persistence.TemporalType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter


public class Corte extends Movimiento{
    @OneToMany(mappedBy = "id",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetalleCorte> detalles;
    @Enumerated(EnumType.STRING)
    private FormaPago formapago;
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;
    @ManyToOne
    @JoinColumn(name = "id_arqueo")
    @JsonIgnore
    private ArqueoCaja arqueocaja;
}
