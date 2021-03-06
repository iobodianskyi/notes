import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './home/notes/notes.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './home/header/header.component';
import { TrashComponent } from './home/trash/trash.component';
import { AboutComponent } from './home/about/about.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { NoteComponent } from './home/notes/note/note.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './home/footer/footer.component';
import { ConfirmTrashDialogComponent } from './dialogs/confirm-trash/confirm-trash-dialog.component';
import { MenuDialogComponent } from './dialogs/menu-dialog/menu-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotesComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    TrashComponent,
    AboutComponent,
    NoteComponent,
    ConfirmTrashDialogComponent,
    MenuDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  entryComponents: [ConfirmTrashDialogComponent, MenuDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
