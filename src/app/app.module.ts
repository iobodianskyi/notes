import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TasksComponent } from './home/tasks/tasks.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { CompletedComponent } from './home/completed/completed.component';
import { TrashComponent } from './home/trash/trash.component';
import { SettingsComponent } from './home/settings/settings.component';
import { AboutComponent } from './home/about/about.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TasksComponent,
    HomeComponent,
    HeaderComponent,
    SidebarComponent,
    CompletedComponent,
    TrashComponent,
    SettingsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
