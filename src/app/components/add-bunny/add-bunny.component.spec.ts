import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBunnyComponent, GenderOption } from './add-bunny.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatSnackBar
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatabaseService } from '../../providers/DatabaseService';
import { of } from 'rxjs';
import spyOnClass from '../../../test-helpers';

describe('AddBunnyComponent', () => {
  let component: AddBunnyComponent;
  let fixture: ComponentFixture<AddBunnyComponent>;
  const databaseServiceMock = spyOnClass(DatabaseService);
  databaseServiceMock.getAllBunnies = jasmine.createSpy().and.returnValue(of([]));
  databaseServiceMock.getGenders = jasmine.createSpy().and.returnValue(of([]));
  databaseServiceMock.getRescueTypes = jasmine.createSpy().and.returnValue(of([]));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBunnyComponent],
      providers: [{
        provide: DatabaseService, useValue: databaseServiceMock,
      }, {
        provide: MatSnackBar, useValue: spyOnClass(MatSnackBar)
      }],
      imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule, MatMomentDateModule, MatDatepickerModule, MatSelectModule, MatFormFieldModule, MatInputModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBunnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
