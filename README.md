## Angular 7 Universal Seeder
Angular 7 universal seeder with latest rxjs version > 6, support HTTP async process, support server cookies with injector of `srvRequest`.

#### Using Server Request Object
	import { Injector, OnInit, Component } from '@angular/core';
	import { Request } from 'express';

	@Component({
	...
	})
	export class Component implements OnInit {
		private req: Request;
		constructor(private injector: Injector) {
			this.req = this.injector.get('srvRequest');
		}

		ngOnInit() {
			console.log(this.req.cookies); // cookies request
		}
	}

#### Installation

    npm install

#### Command Available

    npm run build:prod - build client files only
    npm run build:ssr - build client and server files to /dist
    npm run webpack:server - build server files only

### Author
`Triadi Prabowo - triadiprabowo@gmail.com`
