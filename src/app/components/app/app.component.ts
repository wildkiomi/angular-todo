import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user$: Observable<firebase.User | null>;

  constructor(
    private authService: AuthService,
  ) {
    this.user$ = this.authService.getUser();
  }

  public logOut(): void {
    this.authService.logOut();
  }

}
