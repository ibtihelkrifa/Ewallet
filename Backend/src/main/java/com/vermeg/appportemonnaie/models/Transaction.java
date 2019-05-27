package com.vermeg.appportemonnaie.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Table
@Entity
public class Transaction implements Serializable {
    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @Column(name="Devise")
    String devise;
    @Column(name="Somme")
    float somme;
    @Column(name="Statut")
    String statut;
    @Column(name="Type")
    String type;
    @Column(name="Date_Transaction")
    Date date;
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getDevise() {
        return devise;
    }

    public void setDevise(String devise) {
        this.devise = devise;
    }

    public float getSomme() {
        return somme;
    }

    public void setSomme(float somme) {
        this.somme = somme;
    }

    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }







    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "sourcedebitante")
    private Porte_Monnaie sourcedebitante;

    public Porte_Monnaie getSourcedebitante() {
        return sourcedebitante;
    }

    public void setSourcedebitante(Porte_Monnaie sourcedebitante) {
        this.sourcedebitante = sourcedebitante;
    }

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "sourcecreditante")
    private Porte_Monnaie sourcecreditante;

    public Porte_Monnaie getSourcecreditante() {
        return sourcecreditante;
    }

    public void setSourcecreditante(Porte_Monnaie sourcecreditante) {
        this.sourcecreditante = sourcecreditante;
    }
}
