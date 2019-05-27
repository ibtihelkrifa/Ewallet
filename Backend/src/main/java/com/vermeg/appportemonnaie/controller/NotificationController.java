package com.vermeg.appportemonnaie.controller;

import com.vermeg.appportemonnaie.models.Notification;
import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import com.vermeg.appportemonnaie.models.Transaction;
import com.vermeg.appportemonnaie.models.User;
import com.vermeg.appportemonnaie.services.NotificationService;
import com.vermeg.appportemonnaie.services.PorteMService;
import com.vermeg.appportemonnaie.services.TransactionService;
import com.vermeg.appportemonnaie.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class NotificationController {
    @Autowired
    NotificationService notificationService;
    @Autowired
    PorteMService porteMService;

    @Autowired
    UserService userService;
    @Autowired
    TransactionService transactionService;
    @RequestMapping(value = "notif/create")
    public Notification create(@Valid @RequestBody Notification n) {
        n.setStatut("EN ATTENTE");
        User u = n.getExpediteur();
        Porte_Monnaie p = porteMService.getpm(u);
        Transaction t= new Transaction();
        t.setDevise("TND");
        t.setSomme(n.getSomme());
        t.setStatut("EN ATTENTE");
        t.setDate(new Date());
        if((n.getType()).equals("versement")) {
            t.setSourcecreditante(porteMService.getpm(n.getExpediteur()));
            t.setSourcedebitante(porteMService.getpm(n.getReceiver()));
            t.setType("versement");
            Long s = p.getSolde() - n.getSomme();
            p.setSolde(s);
            porteMService.updateportem(p);
            n.setDatelimite(new Date());
            n.getDatelimite().setMonth(n.getDatenotif().getMonth()+1);
        }
        else
        {
            t.setSourcecreditante(porteMService.getpm(n.getReceiver()));
            t.setSourcedebitante(porteMService.getpm(n.getExpediteur()));
            t.setType(" Retrait de monnaie");
        }


        transactionService.create(t,n);

       return notificationService.create(n);

    }








    @GetMapping(value = "notif/{id}")
    int getnbnotif(@PathVariable Long id) {
      User u=userService.getuser(id);
      return  notificationService.getnbnotif(u);
    }

    @GetMapping(value = "notifs/{id}")
    List<Notification> getnotifs(@PathVariable Long id) {
        User u=userService.getuser(id);
        return  notificationService.getnotifs(u);
    }
    @GetMapping(value = "notifsdemande/{id}")
    List<Notification> getnotifsdemande(@PathVariable Long id) {
        User u=userService.getuser(id);
        return  notificationService.getnotifsdemande(u);
    }


    @GetMapping(value="notifmoney/{id}")
    List<Notification> getnotifmoney(@PathVariable Long id) {
        User u=userService.getuser(id);
        return  notificationService.getnotifmoney(u);
    }

    @RequestMapping(value = "notif/delete")
    public void delete(@Valid @RequestBody Notification n) {
       User u = n.getReceiver();
       Porte_Monnaie p=porteMService.getpm(u);
        User uu = n.getExpediteur();
        Porte_Monnaie pp=porteMService.getpm(uu);
        Transaction t = new Transaction();
        t.setDevise("TND");
        t.setSomme(n.getSomme());
        t.setStatut("SUCCES");
        t.setDate(new Date());
       if((n.getType()).equals("versement")) {
         p.setSolde(p.getSolde() + n.getSomme());
         t.setSourcecreditante(porteMService.getpm(n.getExpediteur()));
         t.setSourcedebitante(porteMService.getpm(n.getReceiver()));
           t.setType("Versement");

       }
     else
     {
         p.setSolde(p.getSolde() - n.getSomme());
         pp.setSolde(p.getSolde() + n.getSomme());
         t.setSourcecreditante(porteMService.getpm(n.getReceiver()));
         t.setSourcedebitante(porteMService.getpm(n.getExpediteur()));
         t.setType("Retrait de Monnaie");

     }
        transactionService.create(t,n);
        porteMService.updateportem(pp);
        porteMService.updateportem(p);
        this.notificationService.delete(n);
    }

    @RequestMapping(value="notif/recup")
    public void recup(@Valid @RequestBody Notification n) {
       Long somme= n.getSomme();
       User u= n.getExpediteur();
       Porte_Monnaie p= porteMService.getpm(u);
       p.setSolde(p.getSolde()+somme);
        Transaction t= new Transaction();
        t.setDevise("TND");
        t.setSomme(n.getSomme());
        t.setSourcecreditante(porteMService.getpm(n.getExpediteur()));
        t.setSourcedebitante(porteMService.getpm(n.getReceiver()));
        t.setStatut("SUCCES");
        t.setType("Recuperation");
        t.setDate(new Date());
        transactionService.create(t,n);
        porteMService.savepm(p);
         this.notificationService.delete(n);
    }

    @RequestMapping(value="notif/annuler")
    public void annuler(@Valid @RequestBody Notification n) {
     if(n.getType().equals("versement")) {
         n.setFini(false);
         n.setStatut("Annulé");
         this.notificationService.update(n);
         Transaction t= new Transaction();
         t.setDevise("TND");
         t.setSomme(n.getSomme());
         t.setSourcecreditante(porteMService.getpm(n.getExpediteur()));
         t.setSourcedebitante(porteMService.getpm(n.getReceiver()));
         t.setStatut("ANNULÉ");
         t.setType("Versement");

         t.setDate(new Date());
         transactionService.create(t,n);


     }
     else
     {
         this.notificationService.delete(n);
     }
    }




}