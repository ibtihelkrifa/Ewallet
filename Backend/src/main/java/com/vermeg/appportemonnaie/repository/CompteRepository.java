package com.vermeg.appportemonnaie.repository;

import com.vermeg.appportemonnaie.models.Compte_Bancaire;
import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface CompteRepository extends JpaRepository<Compte_Bancaire,Long> {


   Compte_Bancaire  save( Compte_Bancaire cmptbnk);


   Compte_Bancaire getOne(Long id);

   @Query("SELECT max(id) from Compte_Bancaire ")
   Long getidcompte();


   @Modifying
   @Query("update Compte_Bancaire c set c.porte_monnaies = ?2 where c.id=?1 ")
   void updatecompte (Long idc,Porte_Monnaie p);

@Query("select c from Compte_Bancaire c where c.porte_monnaies=?1")
List<Compte_Bancaire> getbnk(Porte_Monnaie pm);



    Compte_Bancaire findCompte_BancairesById(Long id);
}
