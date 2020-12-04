import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth.guard';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: 'login', component: AuthComponent },
  { path: 'todo', component: TodoComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: "todo", pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
