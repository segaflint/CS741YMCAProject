import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { JwtModule } from '@auth0/angular-jwt';
import { ProgramsComponent } from './components/programs/programs.component';
import { ProgramComponent } from './components/program/program.component';
import { EditProgramComponent } from './components/edit-program/edit-program.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    ProgramsComponent,
    ProgramComponent,
    EditProgramComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        authScheme: '',
        tokenGetter: () => localStorage.getItem('id_token'),
        allowedDomains: ['localhost:3000','localhost:4200']
      }
    })
  ],
  providers: [
    ValidateService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
