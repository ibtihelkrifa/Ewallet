package com.vermeg.appportemonnaie.repository;

import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import com.vermeg.appportemonnaie.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction,Long> {

    @Query("SELECT a from Transaction a where a.sourcecreditante=?1  or a.sourcedebitante=?1 order by a.date desc ")

    List<Transaction> getalltransactions(Porte_Monnaie p);
}
