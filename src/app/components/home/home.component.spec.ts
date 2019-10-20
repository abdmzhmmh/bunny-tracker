import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DatabaseService } from '../../providers/DatabaseService';
import { of } from 'rxjs';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import spyOnClass from '../../../test-helpers';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let databaseServiceMock = spyOnClass(DatabaseService);
  databaseServiceMock.getAllBunnies = jasmine.createSpy().and.returnValue(of([]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatSnackBarModule, MatAutocompleteModule, MatFormFieldModule, ReactiveFormsModule, FormsModule, MatSelectModule, MatInputModule, NoopAnimationsModule ],
      declarations: [HomeComponent],
      providers: [{
        provide: DatabaseService, useValue: databaseServiceMock,
      },{
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

  it('should render title in a h1 tag', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Search for Bunnies');
  }));
});
