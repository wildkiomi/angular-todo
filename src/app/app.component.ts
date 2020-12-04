import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: Subscription;
  user;

  constructor(
    private authService: AuthService,
  ) {
    this.isLoggedIn = this.authService.isLoggedIn.subscribe(user => {this.user = user; console.log(user)});
  }

  logOut() {
    this.authService.logOut();
  }

}
