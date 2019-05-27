package com.vermeg.appportemonnaie.services;

import com.vermeg.appportemonnaie.models.Compte_Bancaire;
import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import com.vermeg.appportemonnaie.repository.CompteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service

public class CompteService {
   @Autowired
    CompteRepository compteRepository;


   public Compte_Bancaire createcompte(Compte_Bancaire cmptbnk)
   {
      return compteRepository.save(cmptbnk);
   }


   @Transactional
   public Compte_Bancaire getlast()
   {
      Long id =getidc();
      return compteRepository.getOne(id);
   }
  @Transactional
   public void updatecompte(Compte_Bancaire c, Porte_Monnaie p)
   {
       compteRepository.updatecompte(c.getId(),p);
   }

  @Transactional
  public List<Compte_Bancaire> getbnk(Porte_Monnaie pm)
  {
      return compteRepository.getbnk(pm);
  }
   @Transactional
   public Long getidc()
   {
      return compteRepository.getidcompte();
   }
   @Transactional
    public  Compte_Bancaire updatecompte(Compte_Bancaire c)
   {
       return compteRepository.save(c);
   }
   @Transactional
    public void savecompte(Compte_Bancaire c)
   {
       compteRepository.save(c);
   }

   @Transactional
   public Compte_Bancaire getcompte(Long id)
   {
       return compteRepository.findCompte_BancairesById(id);
   }
}
