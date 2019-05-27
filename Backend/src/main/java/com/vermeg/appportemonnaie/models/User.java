package com.vermeg.appportemonnaie.models;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.expression.spel.ast.NullLiteral;
import org.springframework.stereotype.Component;
import sun.security.util.Password;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Table
@Entity

public class User  implements Serializable{
    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @Column(name="Mail",unique=true,nullable=false)
    String mail;

    @Column(name="Nom")
    String nom;
    @Column(name="Prenom")
    String prenom;
    @Column(name="Mot_de_passe")
    String mot_de_passe ;
    @Transient
    private List<Notification> notifications= new ArrayList<Notification>();
    @Transient
    private Porte_Monnaie porte_monnaie;

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getMot_de_passe() {
        return mot_de_passe;
    }

    public void setMot_de_passe(String mot_de_passe) {
        this.mot_de_passe = mot_de_passe;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }



    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL,fetch = FetchType.EAGER)

    public Porte_Monnaie getPorte_monnaie() {
        return porte_monnaie;
    }

    public void setPorte_monnaie(Porte_Monnaie porte_monnaie) {
        this.porte_monnaie = porte_monnaie;
    }

    @OneToMany(mappedBy = "receiver", cascade = CascadeType.ALL)

    public List<Notification> getNotifications() {
        return notifications;
    }

    public void setNotifications(List<Notification> notifications) {
        this.notifications = notifications;
    }

    @OneToMany (mappedBy = "expediteur",cascade = CascadeType.ALL)

    public List<Notification> getNotificationsenvoyes() {
        return notifications;
    }

    public void setNotificationsenvoyes (List<Notification> notifications) {
        this.notifications = notifications;
    }

}
