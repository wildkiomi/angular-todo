import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedIn: Observable<any>;
  user;

  constructor(
    private firebaseAuth: AngularFireAuth,
    private router: Router,
  ) {
    this.isLoggedIn = new Observable((subscriber) => {
      this.firebaseAuth.onAuthStateChanged(subscriber);
    });
    this.user = this.firebaseAuth.user;
   }

   public signUp(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigateByUrl('todo');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  public logIn(email: string, password: string) {
     this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigateByUrl('todo');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  public logOut() {
    this.firebaseAuth.signOut()
      .then((response) => {
        console.log(response)
        this.router.navigateByUrl('login');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }
}
