package com.vermeg.appportemonnaie.services;

import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import com.vermeg.appportemonnaie.models.User;
import com.vermeg.appportemonnaie.repository.PmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service

public class PorteMService {

   @Autowired
    PmRepository pmRepository;



    public void savepm(Porte_Monnaie pm)
    {
        this.pmRepository.save(pm);
    }

  public Porte_Monnaie getpm(User u)
    {
        return this.pmRepository.findPorte_MonnaieByUser(u);
    }

public Porte_Monnaie getpmbyid(Long id){
        return this.pmRepository.findPorte_MonnaieById(id);
}
    @Transactional
    public  Porte_Monnaie updateportem(Porte_Monnaie p)
    {
        return pmRepository.save(p);
    }
}
