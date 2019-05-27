package com.vermeg.appportemonnaie.services;

import com.vermeg.appportemonnaie.models.Organisation;
import com.vermeg.appportemonnaie.repository.OrganisationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class OrganisationService {
    @Autowired
    OrganisationRepository organisationRepository;
    public List<Organisation> getall()
    {
        return organisationRepository.findAll();
    }

  public Organisation getorg(String org)
   {
       return this.organisationRepository.findByNom(org);
   }

}
