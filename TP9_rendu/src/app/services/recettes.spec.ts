import { TestBed } from '@angular/core/testing';

import { Recettes } from './recettes';

describe('Recettes', () => {
  let service: Recettes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Recettes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
