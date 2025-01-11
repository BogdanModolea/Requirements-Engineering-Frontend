import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/auth/login/login.component";
import {RegisterComponent} from "./components/auth/register/register.component";
import {HomeComponent} from "./components/home/home.component";
import {InternshipsComponent} from "./components/internships/internships.component";
import {ApplyComponent} from "./components/apply/apply.component";
import {ApplicationsComponent} from "./components/applications/applications.component";

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
  { path: 'applications', component: ApplicationsComponent } // New route for applications

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
