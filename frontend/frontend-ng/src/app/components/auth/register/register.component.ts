import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserControllerService} from "../../../services/services/user-controller.service";
import { UserInfo} from "../../../services/models/user-info";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerRequest: UserInfo = { email: '', enabled: false, name: '', password: '', roles: ''};
  errorMsg: Array<string> = [];
  successMessage: string = '';

  constructor(private router: Router, private authService: UserControllerService) {}

  login() {
    this.router.navigate(['login']);
  }
  resetPassword() {
    this.router.navigate(['reset-password']);
  }

  register() {
    this.errorMsg = [];
    this.successMessage = '';
    this.authService.addUser({ body: this.registerRequest }).subscribe({
      next: () => {
        this.successMessage = 'Registration successful. Please check your email to activate your account.';
        this.registerRequest = { email: '', enabled: false, name: '', password: '', roles: '' };
        this.router.navigate(['activate-account']);
      },
      error: (err: { error: { validationErrors: string[]; }; }) => {
        this.errorMsg = err.error.validationErrors;
      },
    });
  }

  togglePasswordVisibility(event: any) {
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
      const passwordField = passwordInput as HTMLInputElement;
      passwordField.type = event.target.checked ? 'text' : 'password';
    }
  }
}
