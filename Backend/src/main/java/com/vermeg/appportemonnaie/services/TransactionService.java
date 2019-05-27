package com.vermeg.appportemonnaie.services;

import com.vermeg.appportemonnaie.models.Notification;
import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import com.vermeg.appportemonnaie.models.Transaction;
import com.vermeg.appportemonnaie.repository.PmRepository;
import com.vermeg.appportemonnaie.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class TransactionService {

@Autowired
    TransactionRepository transactionRepository;

@Autowired
PorteMService porteMService;
@Autowired
    PmRepository pmRepository;
    public void create(Transaction t, Notification n)
    {
        Porte_Monnaie p;
        p= porteMService.getpm(n.getReceiver());
        transactionRepository.save(t);



    }


    public List<Transaction> gettransactions(Porte_Monnaie p)
    {
        return transactionRepository.getalltransactions(p);
    }



}
