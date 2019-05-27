package com.vermeg.appportemonnaie.models;


import javax.persistence.*;
import java.io.Serializable;
@Table
@Entity
public class Compte_Bancaire  implements Serializable {
    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @Column(name="RIB",unique=true,nullable=false)
    String rib;
    @Column(name="Solde")    Long solde;
    @Column(name="Devise")
    String devise;
    @Column(name="Organisation")
    String organisation;
    @Column(name="Etat")
    String etat;

    public String getEtat() {
        return etat;
    }

    public void setEtat(String etat) {
        this.etat = etat;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRib() {
        return rib;
    }

    public void setRib(String rib) {
        this.rib = rib;
    }

    public Long getSolde() {
        return this.solde;
    }

    public void setSolde(Long solde) {
        this.solde = solde;
    }

    public String getDevise() {
        return devise;
    }

    public void setDevise(String devise) {
        this.devise = devise;
    }

    public String getOrganisation() {
        return organisation;
    }

    public void setOrganisation(String organisation) {
        this.organisation = organisation;
    }




    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "Portemonnaie_id",unique=true)

    private Porte_Monnaie porte_monnaies;

    public Porte_Monnaie getPorte_monnaies() {
        return porte_monnaies;
    }

    public void setPorte_monnaies(Porte_Monnaie porte_monnaie) {
        this.porte_monnaies= porte_monnaie;
    }
}
