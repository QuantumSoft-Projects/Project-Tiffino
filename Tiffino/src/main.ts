import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations'; // Correct way to provide animations in Angular 17+
import { provideHttpClient } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  ...appConfig, // Spread appConfig correctly
  providers: [
    provideRouter(routes),
    provideAnimations(), // Correct way to add animations
    provideHttpClient(),
    CarouselModule, // ✅ Import Owl Carousel Module globally
    ...(appConfig.providers || []), provideAnimationsAsync() // Ensure other providers are included
  ]

}).catch(err => console.error(err));
