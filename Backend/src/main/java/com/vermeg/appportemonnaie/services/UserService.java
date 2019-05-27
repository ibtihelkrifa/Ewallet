package com.vermeg.appportemonnaie.services;

import com.vermeg.appportemonnaie.models.User;
import com.vermeg.appportemonnaie.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service

public  class UserService {
     @Autowired
    UserRepository userRepository;
     @Transactional
   public  User  VerifLogin(String username )
    {
      return userRepository.findByMail(username);

    }
    @Transactional
    public User getuser(Long id) {

        return userRepository.findUserById(id);

    }


    public List<User> getall()
    {
        return userRepository.findAll();
    }
    public User createuser(User user)
    {
      return  this.userRepository.save(user);
    }
}
