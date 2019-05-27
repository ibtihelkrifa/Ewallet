package com.vermeg.appportemonnaie.controller;

import com.vermeg.appportemonnaie.models.Organisation;
import com.vermeg.appportemonnaie.services.OrganisationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class OrganisationController {
    @Autowired
    OrganisationService organisationService;

    @GetMapping(value="organisation")
    List<Organisation> getall()
    {
        return organisationService.getall();
    }


    @GetMapping(value="organisation/{org}")
    Organisation getOrg(@PathVariable String org)
    {    return organisationService.getorg(org);

    }
}
