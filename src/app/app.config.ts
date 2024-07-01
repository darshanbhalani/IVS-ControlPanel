import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InterceptorService } from './services/interceptor/interceptor.service';
import { tokenHttpInterceptor } from './services/interceptor/interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideClientHydration(), provideAnimations(),provideHttpClient(withFetch(),withInterceptors([tokenHttpInterceptor])), provideAnimationsAsync('noop')]
};
