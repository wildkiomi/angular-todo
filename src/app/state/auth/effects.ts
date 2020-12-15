import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, from } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { logIn, logInSuccess, logOut, logOutSuccess, signUp } from './actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }

  public logIn$ = createEffect(() => this.actions$.pipe(
    ofType(logIn),
    mergeMap(
      ({ payload }) => from(this.authService.logIn(payload.email, payload.password))
        .pipe(
          map(({ user: { uid } }) => {
            return logInSuccess({ payload: uid });
          }),
          catchError(() => EMPTY)
        )
    )
  )
  );

  public signUp$ = createEffect(() => this.actions$.pipe(
    ofType(signUp),
    mergeMap(
      () => from(this.authService.logOut())
        .pipe(
          map(({ user: { uid } }) => {
            return logInSuccess({ payload: uid });
          }),
          catchError(() => EMPTY)
        )
    )
  )
  );

  public logInSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(logInSuccess),
    mergeMap(({ payload }): any => {
      return this.router.navigateByUrl('todo');
  })
  ), { dispatch: false });

  public logOut$ = createEffect(() => this.actions$.pipe(
    ofType(logOut),
    mergeMap(
      () => from(this.authService.logOut())
        .pipe(
          map(() => {
            return logOutSuccess();
          }),
          catchError(() => EMPTY)
        )
    )
  )
  );

  public logOutSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(logOutSuccess),
    mergeMap((): any => {
      return this.router.navigateByUrl('login');
  })
  ), { dispatch: false });

}
