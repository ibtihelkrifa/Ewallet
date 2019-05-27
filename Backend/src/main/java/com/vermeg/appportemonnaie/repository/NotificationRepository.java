package com.vermeg.appportemonnaie.repository;

import com.vermeg.appportemonnaie.models.Notification;
import com.vermeg.appportemonnaie.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface NotificationRepository extends JpaRepository<Notification,Long> {

    @Query("SELECT count(a) from Notification a where a.receiver=?1 and a.fini=true")
    int getnbnotif(User u);

    @Query("SELECT a from Notification a where a.receiver=?1 and a.datelimite>a.datenotif and a.fini=true and a.type like 'versement'")
    List<Notification> getAllByReceiver(User u);



    @Query("SELECT a from Notification a where a.receiver=?1  and a.fini=true   and a.type like 'Demande de Retrait'")
    List<Notification> getbyreceivernotifsdemande(User u);

    @Query("SELECT a from Notification a where a.expediteur=?1 and a.fini=false")
    List<Notification> getnotifmon(User u);

}
