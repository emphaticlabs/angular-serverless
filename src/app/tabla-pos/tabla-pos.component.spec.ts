import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPosComponent } from './tabla-pos.component';

describe('TablaPosComponent', () => {
  let component: TablaPosComponent;
  let fixture: ComponentFixture<TablaPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
