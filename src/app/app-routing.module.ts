import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TodoComponent } from './components/todo/todo.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'todo', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
