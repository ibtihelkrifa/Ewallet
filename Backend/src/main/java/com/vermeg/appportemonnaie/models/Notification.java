package com.vermeg.appportemonnaie.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Table
@Entity
public class Notification implements Serializable {
    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @Column(name="Date_Notification")
    Date datenotif;
    @Column(name="Date_Limite")
    Date datelimite;

    @Column(name="Type")
    String type;
    @Column(name="Somme")
    Long somme;
    @Column(name="Etat")
    Boolean fini;
    @Column(name="Statut")
    String statut;
    
    public String getStatut() {
        return statut;
    }

    public void setStatut(String statut) {
        this.statut = statut;
    }

    public Boolean getFini() {
        return fini;
    }

    public void setFini(Boolean fini) {
        this.fini = fini;
    }

    public Long getSomme() {
        return somme;
    }

    public void setSomme(Long somme) {
        this.somme = somme;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDatenotif() {
        return datenotif;
    }

    public void setDatenotif(Date datenotif) {
        this.datenotif = datenotif;
    }

    public String getType() {
        return type;
    }

    public Date getDatelimite() {
        return datelimite;
    }

    public void setDatelimite(Date datelimite) {
        this.datelimite = datelimite;
    }

    public void setType(String type) {
        this.type = type;
    }
    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "Receiver")
    private User receiver;

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "expediteur")
    private User expediteur;

    public User getExpediteur() {
        return expediteur;
    }

    public void setExpediteur(User expediteur) {
        this.expediteur = expediteur;
    }
}
