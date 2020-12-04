import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {
  userAuth: Subscription;
  user;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.getUser();
  }

  getUser() {
    this.userAuth = this.authService.isLoggedIn.subscribe((user) => {
      
      this.user = user;
      console.log('first')
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  checkLogin(): true|UrlTree {
    console.log(this.authService.user)
    if (!!this.authService.user) {
      return true;
    } else {
      return this.router.parseUrl('/login');
    }
  }

  ngOnDestroy() {
  }
  
}
