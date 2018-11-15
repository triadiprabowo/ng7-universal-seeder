import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutTypeTwoComponent } from './layout-type-two.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [LayoutTypeTwoComponent],
	entryComponents: [LayoutTypeTwoComponent],
	exports: [LayoutTypeTwoComponent]
})
export class LayoutTypeTwoModule { }
