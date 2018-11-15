import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// enable production mode
enableProdMode();

document.addEventListener('DOMContentLoaded', () => {
	platformBrowserDynamic().bootstrapModule(AppModule)
  		.catch(err => console.error(err));
});
