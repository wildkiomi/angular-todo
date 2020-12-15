import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private firebaseAuth: AngularFireAuth,
  ) { }

  public getUser(): Observable<firebase.User | null> {
    return this.firebaseAuth.user;
  }

  public signUp(email: string, password: string): Promise<any> {
    return this.firebaseAuth
      .createUserWithEmailAndPassword(email, password);
  }

  public logIn(email: string, password: string): Promise<any> {
    return this.firebaseAuth
      .signInWithEmailAndPassword(email, password);
  }

  public logOut(): Promise<any> {
    return this.firebaseAuth.signOut();
  }

}
