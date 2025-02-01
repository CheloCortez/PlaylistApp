import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, {
  ...config,
  providers: [
    provideHttpClient(withInterceptorsFromDi())
  ]
});

export default bootstrap;