import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { AuthComponent } from './components/auth/auth.component';
import { TodoComponent } from './components/todo/todo.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppComponent } from './components/app/app.component';
import { TodoPriorityDirective } from './directives/priority/todo-priority.directive';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './state/todo/effects';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './state/todo/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { authReducer } from './state/auth/reducers';
import { AuthEffects } from './state/auth/effects';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    AuthComponent,
    PageNotFoundComponent,
    TodoPriorityDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot({
      auth: authReducer,
      todoList: todoReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    EffectsModule.forRoot([TodoEffects, AuthEffects ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
