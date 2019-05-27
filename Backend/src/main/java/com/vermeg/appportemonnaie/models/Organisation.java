package com.vermeg.appportemonnaie.models;


import javax.persistence.*;

@Table
@Entity
public class Organisation {
    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @Column(name="BankIdentifier",unique=true,nullable=false)
    String  bankidentifier;
    @Column(name="CountryIdentifier",nullable=false)
    String countryidentifier;
    @Column(name="Name")
    String nom;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getBankidentifier() {
        return bankidentifier;
    }

    public void setBankidentifier(String bankidentifier) {
        this.bankidentifier = bankidentifier;
    }

    public String getCountryidentifier() {
        return countryidentifier;
    }

    public void setCountryidentifier(String countryidentifier) {
        this.countryidentifier = countryidentifier;
    }
}
