import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { WebviewDirective } from './directives/webview.directive';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddBunnyComponent } from './components/add-bunny/add-bunny.component';
import { DatabaseService } from "./providers/DatabaseService";
import { ElectronService, NgxElectronModule } from 'ngx-electron';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    NavbarComponent,
    AddBunnyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxElectronModule
  ],
  providers: [DatabaseService, ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule { }
