import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public user: any;

  constructor(
    private authService: AuthService,
  ) {
    this.getUser();
  }

  private getUser(): void {
    this.authService.getUser().subscribe((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }

  public logOut(): void {
    this.authService.logOut();
  }

}
