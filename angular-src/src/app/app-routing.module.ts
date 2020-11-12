import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProgramsComponent } from './components/programs/programs.component';
import { EditProgramComponent } from './components/edit-program/edit-program.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { StaffGuard } from './guards/staff.guard';

const routes: Routes = [
   {path:'', component: HomeComponent },
   {path:'register', component: RegisterComponent },
   {path:'login', component: LoginComponent },
   {path:'profile', component: ProfileComponent, canActivate: [AuthGuard] },
   {path:'programs', component: ProgramsComponent, canActivate: [AuthGuard] },
   {path:'edit-program', component: EditProgramComponent, canActivate: [StaffGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
