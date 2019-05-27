package com.vermeg.appportemonnaie.controller;

import com.vermeg.appportemonnaie.models.Porte_Monnaie;
import com.vermeg.appportemonnaie.models.User;
import com.vermeg.appportemonnaie.services.PorteMService;
import com.vermeg.appportemonnaie.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.validation.Valid;
import java.util.List;

import static java.lang.System.exit;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*")
public class UserController {

   @Autowired
    UserService userService;
   @Autowired
    PorteMService porteMService;
   ///
    @GetMapping(value = "user/{username}")
    User VerifLogin(@PathVariable  String username)
    {    return userService.VerifLogin(username);
}
    @RequestMapping(value = "user/")
   public User createUser(@Valid @RequestBody User user) {
        User u = new User();
        try{
        u=userService.createuser(user);
        Porte_Monnaie p = new Porte_Monnaie();
        p.setUser(u);
        p.setDevise("DNT");
        p.setSolde((long) 0);
        Integer i=user.getMail().hashCode()+user.getMot_de_passe().hashCode();
        Long numpom= new Long(i);
        p.setNumpm(numpom.toString());
        porteMService.savepm(p);

        }
        catch(Exception e)
        {
            System.out.println(e);
        }
        return u ;
    }

    @GetMapping(value="thisuser/{id}")
    User getUser(@PathVariable  Long id)
    {    return userService.getuser(id);

    }


    @GetMapping(value="users")
List<User> getall()
{
    return userService.getall();
}

}