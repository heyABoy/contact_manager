import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list/contact-list.component';
import { AddNewContactComponent } from './contact-list/add-new-contact/add-new-contact.component';
import { UpdateContactComponent } from './contact-list/update-contact/update-contact.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: "", component: ContactListComponent, pathMatch:'full', canActivate: [AuthGuard]},
  {path: 'inscription', component: SignUpComponent},
  {path: 'connexion', component: LogInComponent},
  {path: 'nouveauContact', component:  AddNewContactComponent, canActivate: [AuthGuard] },
  {path: 'modifierContact/:id', component: UpdateContactComponent, canActivate: [AuthGuard]},
  {path: '**', component: ContactListComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
