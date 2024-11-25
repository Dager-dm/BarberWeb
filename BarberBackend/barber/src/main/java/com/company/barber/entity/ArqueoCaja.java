package com.company.barber.entity;

import java.util.Date;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.TemporalType;
import jakarta.persistence.Temporal;
import java.util.List;
import jakarta.persistence.OneToMany;

@Entity
@Getter
@Setter
public class ArqueoCaja {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Temporal(TemporalType.DATE)
    private Date FechaInicio;
    @Temporal(TemporalType.DATE)
    private Date FechaCierre;
    private Long SaldoBase;
    private Long SaldoPrevisto;
    private Long SaldoReal;
    private Long Diferencia;
    private String Observacion;
    private Long TotalIngreso;
    private Long TotalEgreso;
    @Enumerated(EnumType.STRING)
    private EstadoCrud estado;
    @ManyToOne
    @JoinColumn(name = "id_cajero")
    private Cajero cajero;
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Egreso> egresos;
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingreso> ingresos;
    @OneToMany(mappedBy = "id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Corte> cortes;


}
