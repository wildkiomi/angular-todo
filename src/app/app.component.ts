import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public user: any;

  constructor(
    private authService: AuthService,
  ) {}

  public ngOnInit(): void {
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
