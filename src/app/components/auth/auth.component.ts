import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IStore } from 'src/app/models/store';
import { logIn, signUp } from 'src/app/state/auth/actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
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
    private store: Store<IStore>
  ) { }

  public signUp(): void {
    this.store.dispatch(signUp({ payload: { email: this.email.value, password: this.password.value}}));
  }

  public logIn(): void {
    this.store.dispatch(logIn({ payload: { email: this.email.value, password: this.password.value}}));
  }

}
