import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApolloModule } from 'apollo-angular';
import { provideClient } from './graphql.client';

import { CarouselModule } from "angular2-carousel-ztw/carousel.module";
import { AppComponent } from './app.component';
import { AutoComplete } from "./autocomplete";
import {httpFactory} from "./http.factory";
import * as $ from 'jquery';

import { DialogComponent } from './modal-dialog/dialog.component';
import { AppRouteModule,routableComponents } from "./app-routing.module";
import { Angulartics2Facebook , Angulartics2Module ,Angulartics2GoogleAnalytics } from "angulartics2";

import { HttpService } from "./services/HttpService";
@NgModule({
  imports: [BrowserModule,ApolloModule.forRoot(provideClient),FormsModule,ReactiveFormsModule,HttpModule,AppRouteModule,BrowserAnimationsModule,CarouselModule,Angulartics2Module.forRoot([Angulartics2Facebook])],
  declarations: [AppComponent,routableComponents,AutoComplete,DialogComponent],
  providers: [
        {
            provide: Http,
            useFactory: httpFactory,
            deps: [XHRBackend, RequestOptions]
        }
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(angulartics2facebook: Angulartics2Facebook){}
 }
