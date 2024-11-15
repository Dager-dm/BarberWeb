package com.company.barber.entity;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
@Getter
@Setter
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date FechaCita;
    @Temporal(TemporalType.DATE)
    private Date FechaRealizacion;
    private Duration duracionEstimada;
    @OneToMany(mappedBy = "id")
    private List<DetalleCita> detallesci;
    @Enumerated(EnumType.STRING)
    private EstadoCita estado;
    @ManyToOne
    @JoinColumn(name = "id_barbero")
    private Barbero barbero;
    @ManyToOne
    @JoinColumn(name = "id_cliente")
    private Cliente cliente;
}
