import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertError } from 'src/app/model/AlertError';
import { ReservationService } from '../../Reservation/reservation.service';
import { SearchService } from '../search.service';
import { NotificationService } from '../../notification.service';
@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: [ './search.component.css' ]
})
export class SearchComponent implements OnInit {
	constructor(
		public notificationService: NotificationService,
		public rs: ReservationService,
		public ss: SearchService
	) {}
	@ViewChild('inputSearch', { static: false })
	inputSearch: ElementRef;
	title = 'Search for your book..';
	interval = null;
	fieldSearch: string;
	searchData: string;
	booksData = [];
	errorData: AlertError;
	alertData: AlertError;
	addCart: Array<boolean> = [];
	searchFields: string[] = [ 'image', 'title', 'author', 'year', 'Availability' ];
	displayFields: string[] = [ 'title', 'author' ];

	ngOnInit() {
		this.errorData = new AlertError('alert-danger', 'No books');
		this.alertData = new AlertError('alert-info', 'Enter 4 characters to search');
		this.searchData = this.ss.searchData;
		this.fieldSearch = this.ss.fieldSearch;
		if (!this.ss.searchData) {
			this.ss.getData();
		} else {
			this.ss.getSearchData();
		}
	}
	resetSearch(): void {
		this.inputSearch.nativeElement.value = '';
		this.searchData = '';
		this.ss.setField(this.fieldSearch);
	}
	reserveBook(book) {
		// console.log(this.ss.addCart);
		// this.addCart]=true;
		this.rs.reserveBook(book);
	}

	search(event: Event) {
		clearInterval(this.interval);
		this.interval = setInterval(() => {
			this.ss.setData(event);
			clearInterval(this.interval);
		}, 1000);
	}
}
