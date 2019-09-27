import { Injectable } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';

interface addCart {
	isbn: string;
	counter: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class SearchService {
	searchData: string = '';
	authorSample = '';
	authorArray = [];
	finalAuthorArray = [];
	fieldSearch: string = 'isbn';
	booksData = [];
	booksData2019 = [];
	time = null;
	isLoading: boolean = false;
	isNewData: boolean = false;
	resetData: boolean = false;
	resetResult: boolean = true;
	alertData: boolean = true;
	// addCart: [addCart] = [ { isbn: '', counter: false } ];
	order: string = 'title';
	reverse: boolean = false;
	constructor(private orderPipe: OrderPipe) {}

	async getData() {
		this.isLoading = true;
		this.isNewData = true;
		await fetch('https://library-fccj.herokuapp.com/catalog/search', {
			method: 'POST',
			body: JSON.stringify({
				key: 'year',
				value: 2019
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				this.booksData = data;
				this.booksData2019 = data;
				this.sort();
				// this.initialise();
			});
		this.isLoading = false;
	}

	setData(event: any) {
		console.log(event);
		this.searchData = event.target.value;
		if (this.searchData.length >= 4) {
			this.getSearchData();
		} else if (this.searchData.length == 0) {
			this.booksData = this.booksData2019;
			this.isNewData = true;
		} else {
			this.booksData = [];
		}
	}
	async getSearchData() {
		this.isLoading = true;
		this.isNewData = false;
		this.alertData = true;
		await fetch('https://library-fccj.herokuapp.com/catalog/search', {
			method: 'POST',
			body: JSON.stringify({
				key: this.fieldSearch,
				value: this.searchData
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		})
			.then((res) => res.json())
			.then((data) => {
				this.booksData = data;
				this.modifyAuthors(this.booksData);
				this.sort();
				// this.addCart = [ { isbn: '', counter: false } ];
				// this.initialise();
			});
		this.isLoading = false;
	}
	modifyAuthors(booksData) {
		for (const book of booksData) {
			this.authorArray = [];
			this.authorSample = '';
			this.finalAuthorArray = [];
			for (const author of book.author) {
				if (author != '[' && author != ']' && author != "'" && author != "'") {
					this.authorSample += author;
				}
			}
			this.authorArray = this.authorSample.split(',');
			this.authorSample = '';
			for (let i = 0; i < this.authorArray.length; i++) {
				if (this.authorArray[i] != ' ') {
					this.finalAuthorArray[i] = this.authorArray[i];
				}
			}
			for (let i = 0; i < this.finalAuthorArray.length; i++) {
				if (i === this.finalAuthorArray.length - 1) {
					this.authorSample += this.finalAuthorArray[i];
				} else {
					if (i == this.finalAuthorArray.length - 2) {
						this.authorSample += this.finalAuthorArray[i] + ' &';
					} else {
						this.authorSample += this.finalAuthorArray[i] + ',';
					}
				}
			}
			book.author = this.authorSample;
		}
	}
	setField(fieldSearch: string) {
		this.fieldSearch = fieldSearch;
		this.isNewData = true;
		this.resetData = true;
		this.resetResult = true;
		this.alertData = false;
		this.booksData = this.booksData2019;
	}

	resetInput() {
		this.searchData = '';
		this.fieldSearch = 'isbn';
	}
	// initialise() {
	// 	for (let i = 0; i < this.booksData.length; i++) {
	// 		this.addCart.push({ isbn: this.booksData[i].isbn, counter: false });
	// 	}
	// 	console.log(this.addCart);
	// }
	sort() {
		this.booksData = this.orderPipe.transform(this.booksData, 'title');
	}
	setOrder(value: string) {
		if (this.order === value) {
			this.reverse = !this.reverse;
		}

		this.order = value;
	}
}
