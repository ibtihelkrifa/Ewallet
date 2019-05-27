package com.vermeg.appportemonnaie.repository;

import com.vermeg.appportemonnaie.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository

public interface UserRepository extends JpaRepository<User,Long> {
    User findByMail(String aa);
    List<User> findAll();
    User save(User u);
    User findUserById(Long id);

}
