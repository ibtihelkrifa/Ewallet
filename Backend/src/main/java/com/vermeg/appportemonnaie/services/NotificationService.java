package com.vermeg.appportemonnaie.services;

import com.vermeg.appportemonnaie.models.Notification;
import com.vermeg.appportemonnaie.models.User;
import com.vermeg.appportemonnaie.repository.NotificationRepository;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class NotificationService {

    @Autowired
    NotificationRepository notificationRepository;
    public Notification create(Notification n)
    {
        return notificationRepository.save(n);
    }
   public int getnbnotif(User u)
   {
      return  notificationRepository.getnbnotif(u);

   }
   public List<Notification> getnotifs(User u)
   {
       return notificationRepository.getAllByReceiver(u);
   }

   public List<Notification> getnotifsdemande(User u)
   {
       return notificationRepository.getbyreceivernotifsdemande(u);
   }

   public Notification update(Notification n)
   {
       return this.notificationRepository.save(n);
   }
    public List<Notification> getnotifmoney(User u)
    {
        return this.notificationRepository.getnotifmon(u);
    }

    public void delete(Notification n)
    {
        this.notificationRepository.delete(n);
    }


}
