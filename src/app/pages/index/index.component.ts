import { Component, OnInit } from '@angular/core';
import { IndexService } from './index.service';

@Component({
	templateUrl: './index.component.html',
	selector: 'app-index-view'
})
export class IndexComponent implements OnInit {
	public $vm: any;

	constructor(public service: IndexService) { }

	ngOnInit() {
		// get initial data
		this.service.getInitData();

		this.service.$data.subscribe(vm => this.$vm = vm);
	}
}
