package com.company.barber.entity;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Id;
import java.util.List;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Getter
@Setter
public class DetalleCita {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long subtotal;
    @ManyToOne
    @JoinColumn(name = "id_Cita")
    private Cita cita;
    @OneToMany(mappedBy = "id")
    private List<Servicio> servicios;
}
