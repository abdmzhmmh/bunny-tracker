import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBunnyComponent } from './add-bunny.component';

describe('AddBunnyComponent', () => {
  let component: AddBunnyComponent;
  let fixture: ComponentFixture<AddBunnyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBunnyComponent ]
    })
    .compileComponents();
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
