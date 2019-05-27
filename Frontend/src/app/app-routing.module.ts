import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { AddCarteComponent } from './add-carte/add-carte.component';
import { ChargerComponent } from './charger/charger.component';
import { SendMoneyComponent } from './send-money/send-money.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RecupererComponent } from './recuperer/recuperer.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path:'Admin/:id' , component :AdminComponent},
  {
    path:'Inscription',component:InscriptionComponent
  },
  {
    path:'AddMoney/:id' , component: AddMoneyComponent
  },
  {
    path:'AddCarte/:id', component: AddCarteComponent
  },
  {
    path:'SendMoney/:id',component:SendMoneyComponent
  },
  {
    path:'Notifications/:id',component:NotificationsComponent
  },
  {
    path:'Recuperer/:id', component:RecupererComponent
  },
  {
    path:'Charger/:id', component:ChargerComponent
  }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)

  ],
  exports: [ RouterModule ]

})

export class AppRoutingModule { }