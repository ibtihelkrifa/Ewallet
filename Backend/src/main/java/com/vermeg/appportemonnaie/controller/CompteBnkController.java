package com.vermeg.appportemonnaie.controller;

import com.vermeg.appportemonnaie.models.Compte_Bancaire;
import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import com.vermeg.appportemonnaie.services.CompteService;
import com.vermeg.appportemonnaie.services.PorteMService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class CompteBnkController {
@Autowired
    CompteService compteService;
@Autowired
    PorteMService porteMService;

    @RequestMapping(value = "compte/")
    public Compte_Bancaire createUser(@Valid @RequestBody Compte_Bancaire a) {
            System.out.println(a.toString());
           Compte_Bancaire c ;
           try{
               a.setDevise("DNT");
               a.setEtat("Activé");
               c= compteService.createcompte(a);


                return c;
           }
           catch(Exception e)
           {
               System.out.println("erreur insertion"+e.getMessage());
               return null;

           }

    }



@GetMapping(value="comptes/{pmid}")
public List<Compte_Bancaire> getlistbnk(@PathVariable Long pmid)
{
    Porte_Monnaie p;
  p= porteMService.getpmbyid(pmid);
    return compteService.getbnk(p);
}
    @RequestMapping(value = "compte/portem")
    public void createportemonnaieforcompte(@Valid @RequestBody Porte_Monnaie p)
    {
         Compte_Bancaire c;
         c=compteService.getlast();
         System.out.println("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiis");
         compteService.updatecompte(c,p);

    }

    @RequestMapping(value = "compte/update")
    public void chargerportemonnaie(@Valid @RequestBody Compte_Bancaire c)
    {

     c=compteService.updatecompte(c);

    }

    @RequestMapping(value = "compte/decharger")
    public void decharger(@Valid @RequestBody Compte_Bancaire a) {

           Compte_Bancaire c=   compteService.getcompte(a.getId());
        Porte_Monnaie p=c.getPorte_monnaies();
        p.setSolde(p.getSolde()-a.getSolde());
        porteMService.updateportem(p);
           c.setSolde(c.getSolde()+a.getSolde());
           compteService.savecompte(c);

    }


}
