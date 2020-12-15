import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/state/auth/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public user$: Observable<firebase.User | null>;
  public theme: string;

  constructor(
    private authService: AuthService,
    private themeService: ThemeService,
    private store: Store<{ user: {} }>
  ) {
    this.user$ = this.authService.getUser();
  }

  public ngOnInit(): void {
    this.setLightTheme();
  }

  public setLightTheme(): void {
    this.theme = 'light';
    this.themeService.setLightTheme();
  }

  public setDarkTheme(): void {
    this.theme = 'dark';
    this.themeService.setDarkTheme();
  }

  public logOut(): void {
    this.store.dispatch(logOut());
  }

}
