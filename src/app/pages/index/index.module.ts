import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IndexComponent } from './index.component';
import { IndexService } from './index.service';
import { LayoutTypeOneModule } from '../../shared/components/layout-type-one/layout-type-one.module';

@NgModule({
	imports: [
		CommonModule,
		LayoutTypeOneModule,
		RouterModule.forChild([
			{ path: '', component: IndexComponent, pathMatch: 'full' }
		])
	],
	declarations: [IndexComponent],
	providers: [IndexService]
})
export class IndexModule { }
