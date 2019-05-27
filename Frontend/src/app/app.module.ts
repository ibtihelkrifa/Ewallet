import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule} from '@angular/forms';
import{HttpModule} from '@angular/http';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth.service';
import { InscriptionComponent } from './inscription/inscription.component';
import { AddMoneyComponent } from './add-money/add-money.component';
import { AddCarteComponent } from './add-carte/add-carte.component';
import { PmService } from './pm.service';
import { CarteService } from './carte.service';
import { ChargerComponent } from './charger/charger.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HistoriqueService} from './historique.service';
import { SendMoneyComponent } from './send-money/send-money.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { RecupererComponent } from './recuperer/recuperer.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule} from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    

    
    AdminComponent,
    
    HomeComponent,
    
    InscriptionComponent,
    
    AddMoneyComponent,
    
    AddCarteComponent,
    
    ChargerComponent,
    
    SendMoneyComponent,
    
    NotificationsComponent,
    
    RecupererComponent,
    
    FooterComponent,
    
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule , MatButtonModule, MatCheckboxModule, TooltipModule,   AppRoutingModule ,FormsModule,HttpModule ,NgbModule.forRoot(),ReactiveFormsModule

  ],
  providers: [AuthService,PmService,CarteService,HistoriqueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
