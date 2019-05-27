import { TestBed, inject } from '@angular/core/testing';

import { HistoriqueService } from './historique.service';

describe('HistoriqueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoriqueService]
    });
  });

  it('should be created', inject([HistoriqueService], (service: HistoriqueService) => {
    expect(service).toBeTruthy();
  }));
});
