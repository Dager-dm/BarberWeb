package com.company.barber.entity;

//import java.util.Date;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
//import jakarta.persistence.Temporal;
//import jakarta.persistence.TemporalType;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;



@Entity
@Getter
@Setter
public class Ingreso extends Movimiento{

    @ManyToOne
    @JoinColumn(name = "id_ArqueoCaja")
    private ArqueoCaja arqueocaja;
}
