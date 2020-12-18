import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { logOut } from 'src/app/state/auth/actions';
import { IStore } from 'src/app/models/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public user$: Observable<firebase.User | null>;

  constructor(
    private authService: AuthService,
    private store: Store<IStore>
  ) {
    this.user$ = this.authService.getUser();
    const theme = localStorage.getItem('theme');
    if (theme) {
      this.changeTheme(theme);
    }
  }

  public changeTheme(theme: string): void {
    (document.getElementById('themeAsset') as HTMLLinkElement).href = `assets/${theme}.css`;
    localStorage.setItem('theme', theme);
  }

  public logOut(): void {
    this.store.dispatch(logOut());
  }

}
