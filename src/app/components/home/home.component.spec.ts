import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DatabaseService } from '../../providers/DatabaseService';
import { of } from 'rxjs';
import {
  MatAutocompleteModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Type } from '@angular/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SelectAutocompleteComponent } from 'mat-select-autocomplete';

function spyOnClass<T>(spiedClass: Type<T>) {
  const prototype = spiedClass.prototype;

  const methods = Object.getOwnPropertyNames(prototype)
  // Object.getOwnPropertyDescriptor is required to filter functions
    .map(name => [name, Object.getOwnPropertyDescriptor(prototype, name)])
    .filter(([name, descriptor]) => {
      // select only functions
      return (descriptor as PropertyDescriptor).value instanceof Function;
    })
    .map(([name]) => name);
  // return spy object
  return jasmine.createSpyObj('spy', [...methods]);
}


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const databaseServiceMock = spyOnClass(DatabaseService);
  databaseServiceMock.getAllBunnies = jasmine.createSpy().and.returnValue(of([]));
  databaseServiceMock.getGenders = jasmine.createSpy().and.returnValue(of([]));
  databaseServiceMock.getRescueTypes = jasmine.createSpy().and.returnValue(of([]));
  databaseServiceMock.getDateOfBirthExplanations = jasmine.createSpy().and.returnValue(of([]));
  databaseServiceMock.getSpayExplanations = jasmine.createSpy().and.returnValue(of([]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatIconModule, MatCheckboxModule, MatSnackBarModule, MatAutocompleteModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatInputModule, NoopAnimationsModule, MatMomentDateModule, MatDatepickerModule],
      declarations: [HomeComponent, SelectAutocompleteComponent],
      providers: [{
        provide: DatabaseService, useValue: databaseServiceMock,
      }, {
        provide: MatSnackBar, useValue: spyOnClass(MatSnackBar)
      }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should render title in a h1 tag', async(() => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Search for Bunnies');
  // }));
});
