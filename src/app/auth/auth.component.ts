import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(
    private authService: AuthService,
  ) { }

  signUp() {
    this.authService.signUp(this.email.value, this.password.value);
  }

  logIn() {
    this.authService.logIn(this.email.value, this.password.value);
  }

}
