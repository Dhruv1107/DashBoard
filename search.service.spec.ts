import { TestBed } from '@angular/core/testing';
import { OrderModule } from 'ngx-order-pipe';

import { SearchService } from './search.service';

describe('SearchService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [ OrderModule ]
		});
	});

	it('should be created', () => {
		const service: SearchService = TestBed.get(SearchService);
		expect(service).toBeTruthy();
	});

	it('isLoading should be false initially', () => {
		const service: SearchService = TestBed.get(SearchService);
		expect(service.isLoading).toEqual(false);
	});
	it('isNewData should be false initially', () => {
		const service: SearchService = TestBed.get(SearchService);
		expect(service.isNewData).toEqual(false);
	});
	it('resetResult should be false initially', () => {
		const service: SearchService = TestBed.get(SearchService);
		expect(service.resetResult).toEqual(true);
	});

	it("order value should be quual to 'value'", () => {
		const service: SearchService = TestBed.get(SearchService);
		let reverse = service.reverse;
		let value = 'hello';
		service.order = value;
		service.setOrder(value);
		if (service.order === 'hello') {
			expect(service.reverse).toEqual(!reverse);
		}
		expect(service.order).toEqual('hello');
	});

	it("on resetInput() searchData should be empty and fieldSearch should be 'isbn'", () => {
		const service: SearchService = TestBed.get(SearchService);
		service.resetInput();
		expect(service.searchData).toEqual('');
		expect(service.fieldSearch).toEqual('isbn');
	});

	// it("on resetInput() searchData should be empty and fieldSearch should be 'isbn'", () => {
	// 	const service: SearchService = TestBed.get(SearchService);
	// 	let event = new Event();
	// 	service.setData(event);
	// });

	it("on setField() searchData should be empty and fieldSearch should be 'isbn'", () => {
		const service: SearchService = TestBed.get(SearchService);
		let fieldSearch = 'software';
		service.setField(fieldSearch);
		expect(service.fieldSearch).toEqual(fieldSearch);
		expect(service.isNewData).toEqual(true);
		expect(service.resetData).toEqual(true);
		expect(service.resetResult).toEqual(true);
		expect(service.alertData).toEqual(false);
	});

	it('fetches a known profile from firebase', async () => {
		const service: SearchService = TestBed.get(SearchService);
		service.getSearchData();
		expect(service.isLoading).toEqual(true);
		expect(service.isNewData).toEqual(false);
		expect(service.alertData).toEqual(true);
	});

	it('modifyAuthors', () => {
		const service: SearchService = TestBed.get(SearchService);
		let booksData = [ { author: `['Jon Barrilleaux', '', '']` } ];
		service.modifyAuthors(booksData);
		expect(booksData[0].author).toEqual('Jon Barrilleaux');
	});
});
