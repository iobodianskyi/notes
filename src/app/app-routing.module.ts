import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { TrashComponent } from './home/trash/trash.component';
import { AboutComponent } from './home/about/about.component';
import { AuthGuard } from './services/auth.guard';
import { LoggedInGuard } from './services/loggedin.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full', canActivate: [LoggedInGuard] },
  {
    path: '', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: 'tasks', component: TasksComponent },
      { path: 'trash', component: TrashComponent },
      { path: 'about', component: AboutComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
