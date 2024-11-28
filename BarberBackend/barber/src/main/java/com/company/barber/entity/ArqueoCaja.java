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
    @Temporal(TemporalType.TIMESTAMP)
    private Date FechaInicio;
    @Temporal(TemporalType.TIMESTAMP)
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
    @OneToMany(mappedBy = "arqueocaja", cascade = CascadeType.ALL)
    private List<Egreso> egresos;
    @OneToMany(mappedBy = "arqueocaja", cascade = CascadeType.ALL)
    private List<Ingreso> ingresos;
    @OneToMany(mappedBy = "arqueocaja", cascade = CascadeType.ALL)
    private List<Corte> cortes;






    public void CalcularSaldoPrevisto(){
        System.out.println("dentro de la funcion");
            for (Corte corte : cortes) {
                System.out.println(SaldoPrevisto);
                if (corte.getFormapago().equals(FormaPago.Efectivo)) {
                    SaldoPrevisto=SaldoBase+corte.getValor();
                    System.out.println("dentro del if");
                    System.out.println(corte.getFormapago());
                }
            }

            for (Ingreso i : ingresos) {
                SaldoPrevisto = SaldoPrevisto + i.getValor();
            }

            for (Egreso e : egresos) {
                SaldoPrevisto = SaldoPrevisto - e.getValor();
            }

        }


    public void CalcularIngresos() {

        for (Corte corte : cortes) {
            TotalIngreso = TotalIngreso + corte.getValor();
        }

        for (Ingreso i : ingresos) {
            TotalIngreso = TotalIngreso + i.getValor();
        }

    }

    public void CalcularEgresos() {
        for (Egreso e : egresos) {
            TotalEgreso = TotalEgreso + e.getValor();
        }
    }

    public void CalcularDiferencia() {
        Diferencia =  SaldoReal - SaldoPrevisto ;
    }

}
