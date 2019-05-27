import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { DatabaseService } from '../../providers/DatabaseService';
import { Type } from '@angular/core';
import Bunny from '../../entities/bunny.schema';
import { EMPTY, Observable } from 'rxjs';

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

class DatabaseServiceMock extends DatabaseService {
  constructor() {
    super(undefined);
  }
  addBunny(_bunny: Bunny): Observable<Bunny[]> {
    return EMPTY;
  }
  deleteBunny(_bunny: Bunny): Observable<Bunny[]> {
    return EMPTY;
  }
  getBunnies(): Observable<Bunny[]> {
    return EMPTY;
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [{provide: DatabaseService, useClass: DatabaseServiceMock}]
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
