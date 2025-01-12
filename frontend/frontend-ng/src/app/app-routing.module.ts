import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {InternshipsComponent} from "./components/internships/internships.component";
import {ApplyComponent} from "./components/apply/apply.component";
import {ApplicationsComponent} from "./components/applications/applications.component";
import { ProfileComponent } from './profile/profile.component';
import { MyapplicationComponent } from './myapplication/myapplication.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddInternshipComponent } from './components/add-internship/add-internship.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'internships',
    component: InternshipsComponent
  },
  {path: 'apply/:id', component: ApplyComponent},
  { path: 'applications/:id', component: ApplicationsComponent }, 
  { path: 'profile', component: ProfileComponent },
  { path: 'my-applications', component: MyapplicationComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
  { path: 'add-internship', component: AddInternshipComponent },

  // {
  //   path: 'fragrances',
  //   loadChildren: () => import('./modules/fragrance/fragrance.module').then(m => m.FragranceModule),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
