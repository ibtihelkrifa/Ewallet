package com.vermeg.appportemonnaie.controller;

import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import com.vermeg.appportemonnaie.models.Transaction;
import com.vermeg.appportemonnaie.models.User;
import com.vermeg.appportemonnaie.services.PorteMService;
import com.vermeg.appportemonnaie.services.TransactionService;
import com.vermeg.appportemonnaie.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class TransactionController {
   @Autowired
    UserService userService;
   @Autowired
    PorteMService porteMService;

   @Autowired
    TransactionService transactionService;

    @GetMapping(value = "historiques/{id}")
    List<Transaction> gethistoriques(@PathVariable Long id) {
        User u;
        u=this.userService.getuser(id);
        Porte_Monnaie p= porteMService.getpm(u);
        return transactionService.gettransactions(p);

    }
}
