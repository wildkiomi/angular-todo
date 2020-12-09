import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
  ) { }

  public getUser(): Observable<firebase.User | null> {
    return this.firebaseAuth.user;
  }

  public signUp(email: string, password: string): Promise<void> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigateByUrl('todo');
      });
  }

  public logIn(email: string, password: string): Promise<void> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigateByUrl('todo');
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
