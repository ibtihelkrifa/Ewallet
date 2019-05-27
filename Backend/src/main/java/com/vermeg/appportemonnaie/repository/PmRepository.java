package com.vermeg.appportemonnaie.repository;

import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import com.vermeg.appportemonnaie.models.Transaction;
import com.vermeg.appportemonnaie.models.User;
import com.vermeg.appportemonnaie.services.PorteMService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PmRepository   extends JpaRepository<Porte_Monnaie,Long> {

    void save(PorteMService pm);

    Porte_Monnaie findPorte_MonnaieByUser(User u);

    Porte_Monnaie findPorte_MonnaieById(Long id);




}