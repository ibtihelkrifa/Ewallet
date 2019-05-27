package com.vermeg.appportemonnaie.models;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Table
@Entity
public class Porte_Monnaie  implements Serializable {

    @Id
    @Column(name="Id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;
    @Column(name="Num_PM",unique=true,nullable=false)
    String numpm;
    @Column(name="Solde")
    Long solde;
    @Column(name="Devise")
    String devise;



    @ManyToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "User_id")
    private User user;

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNumpm() {
        return numpm;
    }

    public void setNumpm(String numpm) {
        this.numpm = numpm;
    }

    public Long getSolde() {
        return solde;
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

    @Transient
    private List<Compte_Bancaire> compte_bancaires;



    @OneToMany(mappedBy = "porte_monnaies", cascade = CascadeType.ALL,fetch = FetchType.EAGER)

    public List<Compte_Bancaire> getCompteBancaires()
    {
        return compte_bancaires;
    }

    public void setCompteBancaires(List<Compte_Bancaire> Compte_Bnacaires) {
        this.compte_bancaires = Compte_Bnacaires;
    }

 





    @Transient
    private List<Transaction> transaction_debitantes= new ArrayList<Transaction>();


    @OneToMany(mappedBy = "sourcedebitante", cascade = CascadeType.ALL)
    public List<Transaction> getTransaction_debitantes() {
        return transaction_debitantes;
    }

    public void setTransaction_debitantes(List<Transaction> transaction_debitantes) {
        this.transaction_debitantes = transaction_debitantes;
    }

    @Transient
    private List<Transaction> transaction_creditantes;
    @OneToMany(mappedBy = "sourcecreditante", cascade = CascadeType.ALL)

    public List<Transaction> getTransaction_creditantes() {
        return transaction_creditantes;
    }

    public void setTransaction_creditantes(List<Transaction> transaction_creditantes) {
        this.transaction_creditantes = transaction_creditantes;
    }



}
