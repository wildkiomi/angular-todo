import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
  ) { }

  public getUser(): Observable<any> {
    return this.firebaseAuth.user;
  }

  public signUp(email: string, password: string): void {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigateByUrl('todo');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  public logIn(email: string, password: string): void {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigateByUrl('todo');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

  public logOut(): void {
    this.firebaseAuth.signOut()
      .then(() => {
        this.router.navigateByUrl('login');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

}
