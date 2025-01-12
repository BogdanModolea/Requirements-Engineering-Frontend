import { NgModule } from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { HomeComponent } from './components/home/home.component';
import { InternshipsComponent } from './components/internships/internships.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ProfileComponent } from './profile/profile.component';
import { MyapplicationComponent } from './myapplication/myapplication.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    InternshipsComponent,
    ApplicationsComponent,
    ApplyComponent,
    ProfileComponent,
    MyapplicationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration(),
    HttpClient,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: HttpTokenInterceptor,
    //   multi: true
    // },
    // provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
