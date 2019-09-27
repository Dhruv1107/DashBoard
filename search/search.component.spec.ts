import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ReservationService } from '../../Reservation/reservation.service';
import { AlertComponent } from '../../shared/alert/alert.component';
import { SearchService } from '../search.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from '../loader/loader.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderModule } from 'ngx-order-pipe';

describe('SearchComponent', () => {
	let component: SearchComponent;
	let fixture: ComponentFixture<SearchComponent>;
	let router: Router;
	let modal: NgbModal;
	beforeEach(
		async(() => {
			TestBed.configureTestingModule({
				declarations: [ SearchComponent, AlertComponent, LoaderComponent ],
				imports: [ FormsModule, RouterModule, RouterTestingModule, OrderModule ]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(SearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('interval should be null', () => {
		expect(component.interval).toEqual(null);
	});
	it('title should be `Search for your book..` initially', () => {
		expect(component.title).toEqual('Search for your book..');
	});
	it('searchFields[0] should be image', () => {
		expect(component.searchFields[0]).toEqual('image');
	});
	it('displayFields[0] should be title', () => {
		expect(component.displayFields[0]).toEqual('title');
	});
	it('on resetSearch() searchData should be empty', () => {
		component.resetSearch();
		expect(component.inputSearch.nativeElement.value).toEqual('');
		expect(component.searchData).toEqual('');
	});
});
