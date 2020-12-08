import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  public error: string;

  public email = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(
    private authService: AuthService,
  ) { }

  public signUp(): void {
    this.authService.signUp(this.email.value, this.password.value)
    .catch((error) => this.error = error.message);
  }

  public logIn(): void {
    this.authService.logIn(this.email.value, this.password.value)
    .catch((error) => this.error = error.message);
  }

}
