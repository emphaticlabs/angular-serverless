import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PronosticosListComponent } from './pronosticos-list.component';

describe('PronosticosListComponent', () => {
  let component: PronosticosListComponent;
  let fixture: ComponentFixture<PronosticosListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PronosticosListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PronosticosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
