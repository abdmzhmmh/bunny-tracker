import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddBunnyComponent } from './add-bunny.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatSelectModule, MatInputModule } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddBunnyComponent', () => {
  let component: AddBunnyComponent;
  let fixture: ComponentFixture<AddBunnyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddBunnyComponent],
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
