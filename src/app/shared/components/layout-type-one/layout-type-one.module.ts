import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutTypeOneComponent } from './layout-type-one.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [LayoutTypeOneComponent],
	entryComponents: [LayoutTypeOneComponent],
	exports: [LayoutTypeOneComponent],
	providers: []
})
export class LayoutTypeOneModule { }
