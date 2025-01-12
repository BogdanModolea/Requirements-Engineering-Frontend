import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Router} from "@angular/router";
import {UserInfo} from "../../../services/models/user-info";
import {UserControllerService} from "../../../services/services/user-controller.service";
import {AuthRequest} from "../../../services/models/auth-request";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authRequest: AuthRequest = { username: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: UserControllerService,
    // private tokenService: TokenService
  ) {}

  login() {
    this.errorMsg = [];
    this.authService.authenticateAndGetToken({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        // this.tokenService.token = res.token as string;
        this.router.navigate(['internships']);
        localStorage.setItem('token', res.token as string);
        console.log("uwu" + res.token);
      },
      error: (err : any) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          let errorMessage = err.error;
          let errorMessageParts = errorMessage.split(":");
          if (errorMessageParts.length > 1) {
            errorMessage = errorMessageParts.slice(1).join(":").trim();
          }
          this.errorMsg.push(errorMessage);
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }

  togglePasswordVisibility(event: any) {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      const passwordField = passwordInput as HTMLInputElement;
      passwordField.type = event.target.checked ? 'text' : 'password';
    }
  }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }
}
