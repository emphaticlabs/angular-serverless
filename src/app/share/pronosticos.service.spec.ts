import { TestBed, inject } from '@angular/core/testing';

import { PronosticosService } from './pronosticos.service';

describe('PronosticosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PronosticosService]
    });
  });

  it('should be created', inject([PronosticosService], (service: PronosticosService) => {
    expect(service).toBeTruthy();
  }));
});
