package com.vermeg.appportemonnaie.controller;

import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import com.vermeg.appportemonnaie.models.User;
import com.vermeg.appportemonnaie.services.PorteMService;
import com.vermeg.appportemonnaie.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class PmController {
    @Autowired
    PorteMService porteMService;
    @Autowired
    UserService userService;

    @GetMapping(value = "pm/{id}")
    Porte_Monnaie VerifLogin(@PathVariable Long id) {
        User u;
        u=this.userService.getuser(id);
        return porteMService.getpm(u);

    }

    @RequestMapping(value = "pm/update")
    public void createportemonnaieforcompte(@Valid @RequestBody Porte_Monnaie p)
    {

        porteMService.updateportem(p);

    }
}