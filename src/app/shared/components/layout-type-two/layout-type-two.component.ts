import { Component, Input } from '@angular/core';
import { Content } from './interface';

@Component({
	selector: 'app-layout-type-two',
	templateUrl: './layout-type-two.component.html',
	styleUrls: ['./layout-type-two.component.scss']
})
export class LayoutTypeTwoComponent {
	@Input('contents') public contents: Content;

	constructor() {

	}
}
