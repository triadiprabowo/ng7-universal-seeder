import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConstantService } from '../../shared/services/constant.service';

interface ViewModel {
	data: any[];
	isFetching: boolean;
	isFetched: boolean;
}

@Injectable()
export class IndexService {
	public $data: Observable<ViewModel>;
	private $subject: BehaviorSubject<ViewModel>;
	private store: ViewModel;

	constructor(private http: HttpClient, private api: ConstantService) {
		this.store = {
			data: [],
			isFetching: false,
			isFetched: false
		};

		this.$subject = <BehaviorSubject<ViewModel>>new BehaviorSubject({});
		this.$data = this.$subject.asObservable();
	}

	public dispatch(obj: any): ViewModel {
		const newobj: ViewModel = Object.assign(this.store, obj);
		this.$subject.next(newobj);

		return newobj;
	}

	public getInitData() {
		this.dispatch({ isFetching: true });

		this.http.get<any>(`${this.api.baseApiUrl}/api/people`)
		.subscribe(
			data => {
				this.dispatch({ isFetching: false, isFetched: true, data: data.results });
			},
			error => {
				this.dispatch({ isFetching: false, isFetched: true, data: [] });
			}
		);
	}
}
