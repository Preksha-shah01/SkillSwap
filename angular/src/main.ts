import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';

@Component({selector:'app-root',standalone:true,templateUrl:'./app/app.component.html'})
export class AppComponent {}

bootstrapApplication(AppComponent).catch(err=>console.error(err));
