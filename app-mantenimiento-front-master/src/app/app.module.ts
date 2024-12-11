import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegistroComponent } from './components/registro/registro.component';



@NgModule({
    imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
    ],
    providers: [provideHttpClient()], 

    bootstrap: [],
  })
  export class AppModule { }

