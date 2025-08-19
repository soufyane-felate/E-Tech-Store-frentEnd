/// <reference types="@angular/localize" />

import 'bootstrap/dist/js/bootstrap.bundle.min';

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    ...appConfig.providers, provideAnimationsAsync(), provideAnimationsAsync(), 
  ],
}).catch((err) => console.error(err));
