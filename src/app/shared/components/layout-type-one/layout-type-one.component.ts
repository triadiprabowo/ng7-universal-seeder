import { Component, Input } from '@angular/core';
import { Content } from './interface';

@Component({
	selector: 'app-layout-type-one',
	templateUrl: './layout-type-one.component.html',
	styleUrls: ['./layout-type-one.component.scss']
})
export class LayoutTypeOneComponent {
	@Input('contents') public contents: Content;


	constructor() { }
}
