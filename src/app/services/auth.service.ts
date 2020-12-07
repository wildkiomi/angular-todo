import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
      .then(({ user }) => {
        localStorage.setItem('user', JSON.stringify(user));
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
        localStorage.removeItem('user');
      })
      .catch(err => {
        console.log(err.message);
      });
  }

}
