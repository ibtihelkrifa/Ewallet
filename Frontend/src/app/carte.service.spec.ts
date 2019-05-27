import { TestBed, inject } from '@angular/core/testing';

import { CarteService } from './carte.service';

describe('CarteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarteService]
    });
  });

  it('should be created', inject([CarteService], (service: CarteService) => {
    expect(service).toBeTruthy();
  }));
});
